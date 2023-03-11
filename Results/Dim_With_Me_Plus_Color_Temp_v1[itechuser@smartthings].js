
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When this...', section => {
            section.deviceSetting('masters').capability(['switchLevel']).name('Master Dimmer Switch...');

        });


        page.section('And these will follow with color temperature...', section => {
            section.deviceSetting('slaves3').capability(['switchLevel']).name('Slave Osram Lightify Bulbs...');

        });


        page.section('Then these will follow with on/off...', section => {
            section.deviceSetting('slaves2').capability(['switch']).name('Slave On/Off Switch(es)...');

        });


        page.section('And these will follow with dimming level...', section => {
            section.deviceSetting('slaves').capability(['switchLevel']).name('Slave Dimmer Switch(es)...');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.masters, 'switchLevel', 'switch', 'switchSetLevelHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.masters, 'switchLevel', 'switch.off', 'switchOffHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.masters, 'switchLevel', 'switch.setLevel', 'switchSetLevelHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.masters, 'switchLevel', 'colorTemp', 'switchSetColorTempHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.masters, 'switchLevel', 'switch.on', 'switchOnHandler')

    })

    .subscribedEventHandler('switchSetColorTempHandler', (context, event) => {
        
        if (event.value == 'on' || event.value == 'off') {
        return null
        }
        let level = event.value.toFloat()
        level = level.toInteger()
        log.info("switchSetColorTempHandler Event: $level")
        slaves3?.setColorTemp(level)
        

	})

    .subscribedEventHandler('switchOffHandler', (context, event) => {
        
        log.info("switchoffHandler Event: ${event.value}")
        slaves?.off()
        slaves2?.off()
        slaves3?.off()
        

	})

    .subscribedEventHandler('switchSetLevelHandler', (context, event) => {
        
        if (event.value == 'on' || event.value == 'off') {
        return null
        }
        let level = event.value.toFloat()
        level = level.toInteger()
        log.info("switchSetLevelHandler Event: $level")
        slaves?.setLevel(level)
        slaves3?.setLevel(level)
        

	})

    .subscribedEventHandler('switchOnHandler', (context, event) => {
        
        log.info("switchOnHandler Event: ${event.value}")
        
        context.api.devices.sendCommands(context.config.masters, 'switchLevel', latestValue)
    
        slaves?.on()
        slaves2?.on()
        slaves3?.on()
        

	})
