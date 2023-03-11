
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

        await context.api.subscriptions.subscribeToDevices(context.config.masters, 'switchLevel', 'switch', 'switchSetLevelHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.masters, 'switchLevel', 'switch.off', 'switchOffHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.masters, 'switchLevel', 'switch.setLevel', 'switchSetLevelHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.slaves2, 'switch', 'switch.on', 'slavesOnHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.masters, 'switchLevel', 'level', 'switchSetLevelHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.slaves2, 'switch', 'switch.off', 'slavesOffHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.masters, 'switchLevel', 'switch.on', 'switchOnHandler')

    })

    .subscribedEventHandler('switchOffHandler', (context, event) => {
        
        log.info("switchoffHandler Event: ${event.value}")
        slaves?.off()
        slaves2?.off()
        

	})

    .subscribedEventHandler('switchOnHandler', (context, event) => {
        
        log.info("switchOnHandler Event: ${event.value}")
        
        context.api.devices.sendCommands(context.config.masters, 'switchLevel', latestValue)
    
        slaves?.on()
        slaves2?.on()
        

	})

    .subscribedEventHandler('switchSetLevelHandler', (context, event) => {
        
        if (event.value == 'on' || event.value == 'off') {
        return null
        }
        let level = event.value.toFloat()
        level = level.toInteger()
        
        context.api.devices.sendCommands(context.config.masters, 'switchLevel', info)
    
        
        context.api.devices.sendCommands(context.config.masters, 'switchLevel', setLevel)
    
        

	})

    .subscribedEventHandler('slavesOnHandler', (context, event) => {
        
        let allOn = true
        for (let slave : slaves2 ) {
        if (slave.currentValue('switch') == 'off') {
        allOn = false
        last
        }
        }
        if
        
        context.api.devices.sendCommands(context.config.masters, 'switchLevel', on)
    
        }
        

	})

    .subscribedEventHandler('slavesOffHandler', (context, event) => {
        
        let allOff = true
        for (let slave : slaves2 ) {
        if (slave.currentValue('switch') == 'on') {
        allOff = false
        last
        }
        }
        if
        
        context.api.devices.sendCommands(context.config.masters, 'switchLevel', off)
    
        }
        

	})
