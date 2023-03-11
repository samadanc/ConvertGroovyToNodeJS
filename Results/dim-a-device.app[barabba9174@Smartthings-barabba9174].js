
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When this...', section => {
            section.deviceSetting('masters').capability(['switchLevel']).name('Master Dimmer Switch...');

        });


        page.section('Then these will follow with on/off...', section => {
            section.deviceSetting('slaves2').capability(['switch']).name('Slave On/Off Switch(es)...');

        });


        page.section('And these will follow with dimming level...', section => {
            section.deviceSetting('slaves').capability(['switchLevel']).name('Slave Dimmer Switch(es)...');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.masters, 'switchLevel', 'switch.off', 'switchOffHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.masters, 'switchLevel', 'switch.on', 'switchOnHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.masters, 'switchLevel', 'level', 'switchSetLevelHandler')

    })

    .subscribedEventHandler('switchOffHandler', (context, event) => {
        
        log.info("switchoffHandler Event: ${event.value}")
        slaves?.off()
        slaves2?.off()
        

	})

    .subscribedEventHandler('switchSetLevelHandler', (context, event) => {
        
        log.info("switchSetLevelHandler event: $evt")
        log.info("switchSetLevelHandler value: ${event.value}")
        
        context.api.devices.sendCommands(context.config.masters, 'switchLevel', latestValue)
    
        log.info("switchSetLevelHandler Event: $latestValue")
        slaves?.setLevel(latestValue)
        

	})

    .subscribedEventHandler('switchOnHandler', (context, event) => {
        
        log.info("switchOnHandler Event: ${event.value}")
        
        context.api.devices.sendCommands(context.config.masters, 'switchLevel', setLevel)
    
        slaves2?.on()
        

	})
