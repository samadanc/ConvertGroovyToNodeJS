
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Using this ...', section => {
            section.deviceSetting('master').capability(['colorControl']).name('Master device');

        });


        page.section('Control these ...', section => {
            section.deviceSetting('slaves').capability(['colorControl']).name('Slave devices');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.master, 'colorControl', 'color', 'setColorHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.master, 'colorControl', 'level', 'setLevelHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.master, 'colorControl', 'switch.off', 'offHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.master, 'colorControl', 'switch.on', 'onHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.master, 'colorControl', 'colorTemperature', 'setColorTempHandler')

    })

    .subscribedEventHandler('onHandler', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.slaves, 'colorControl', on)
    
        

	})

    .subscribedEventHandler('offHandler', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.slaves, 'colorControl', off)
    
        

	})

    .subscribedEventHandler('setColorTempHandler', (context, event) => {
        
        let temp = event.value.toFloat()
        temp = temp.toInteger()
        
        context.api.devices.sendCommands(context.config.slaves, 'colorControl', setColorTemperature)
    
        

	})

    .subscribedEventHandler('setLevelHandler', (context, event) => {
        
        let level = event.value.toFloat()
        level = level.toInteger()
        
        context.api.devices.sendCommands(context.config.slaves, 'colorControl', setLevel)
    
        

	})

    .subscribedEventHandler('setColorHandler', (context, event) => {
        
        console.log("${new Date()} Setting color using event data: ${event.value}")
        console.log("${new Date()} DATA contains: ${event.data}")
        let jsonSlurper = new JsonSlurper()
        let payload = jsonSlurper.parseText(event.data)
        
        context.api.devices.sendCommands(context.config.slaves, 'colorControl', setColor)
    
        

	})
