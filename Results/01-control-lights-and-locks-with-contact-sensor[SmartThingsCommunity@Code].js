
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select Devices', section => {
            section.deviceSetting('contact').capability(['contactSensor']).name('Select a contact sensor');
            section.deviceSetting('light').capability(['switch']).name('Select a light or outlet');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.contact, 'contactSensor', 'contact.open', 'openHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.contact, 'contactSensor', 'contact.closed', 'closedHandler')

    })

    .subscribedEventHandler('openHandler', (context, event) => {
        
        console.log("${event.name}: ${event.value}")
        
        context.api.devices.sendCommands(context.config.light, 'switch', on)
    
        

	})

    .subscribedEventHandler('closedHandler', (context, event) => {
        
        console.log("${event.name}: ${event.value}")
        
        context.api.devices.sendCommands(context.config.light, 'switch', off)

        console.log("{{interesting}}")
        

	})
