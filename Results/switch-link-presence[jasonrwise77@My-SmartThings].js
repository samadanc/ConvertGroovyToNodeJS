
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When This Switch Changes', section => {
            section.deviceSetting('switch1').capability(['switch']).name('');

        });


        page.section('Change This Presence', section => {
            section.deviceSetting('presence1').capability(['presence sensor']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.presence1, 'presence sensor', 'presence.not present', 'departedHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.presence1, 'presence sensor', 'presence.present', 'arrivedHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.switch1, 'switch', 'switch.on', 'onHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.switch1, 'switch', 'switch.off', 'offHandler')

    })

    .subscribedEventHandler('onHandler', (context, event) => {
        
        console.log(event.value)
        console.log("Changing presence to arrived: $presence1")
        
        context.api.devices.sendCommands(context.config.presence1, 'presence sensor', arrived)
    
        

	})

    .subscribedEventHandler('arrivedHandler', (context, event) => {
        
        console.log(event.value)
        console.log("Turning on switch: $switch1")
        
        context.api.devices.sendCommands(context.config.switch1, 'switch', on)
    
        

	})

    .subscribedEventHandler('departedHandler', (context, event) => {
        
        console.log(event.value)
        console.log("Turning off switch: $switch1")
        
        context.api.devices.sendCommands(context.config.switch1, 'switch', off)
    
        

	})

    .subscribedEventHandler('offHandler', (context, event) => {
        
        console.log(event.value)
        console.log("Changing presence to departed: $presence1")
        
        context.api.devices.sendCommands(context.config.presence1, 'presence sensor', departed)
    
        

	})
