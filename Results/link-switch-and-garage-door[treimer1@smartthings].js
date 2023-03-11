
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When this switch is turned on', section => {
            section.deviceSetting('switch1').capability(['switch']).name('');

        });


        page.section('Open this garage door', section => {
            section.deviceSetting('door1').capability(['doorControl']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.door1, 'doorControl', 'door.open', 'openHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.switch1, 'switch', 'switch.on', 'onHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.switch1, 'switch', 'switch.off', 'offHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.door1, 'doorControl', 'door.closed', 'closedHandler')

    })

    .subscribedEventHandler('openHandler', (context, event) => {
        
        console.log(event.value)
        console.log("Turning on switch: $switch1")
        
        context.api.devices.sendCommands(context.config.switch1, 'switch', on)
    
        

	})

    .subscribedEventHandler('onHandler', (context, event) => {
        
        console.log(event.value)
        console.log("Opening door: $door1")
        
        context.api.devices.sendCommands(context.config.door1, 'doorControl', open)
    
        

	})

    .subscribedEventHandler('offHandler', (context, event) => {
        
        console.log(event.value)
        console.log("Closing door: $door1")
        
        context.api.devices.sendCommands(context.config.door1, 'doorControl', close)
    
        

	})

    .subscribedEventHandler('closedHandler', (context, event) => {
        
        console.log(event.value)
        console.log("Turning off switch: $switch1")
        
        context.api.devices.sendCommands(context.config.switch1, 'switch', off)
    
        

	})
