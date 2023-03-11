
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When I arrive...', section => {
            section.deviceSetting('presence1').capability(['presenceSensor']).name('Who Arrives?');

        });


        page.section('If Garage door closed...', section => {
            section.deviceSetting('GarageDoorContact').capability(['contactSensor']).name('Is door Closed or Open?');

        });


        page.section('Open Garage Door...', section => {
            section.deviceSetting('GarageDoorOpener').capability(['switch']).name('Open which door?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.presence1, 'presenceSensor', 'presence', 'presenceHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.GarageDoorContact, 'contactSensor', 'contact.open', 'contactOpenHandler')

    })

    .subscribedEventHandler('presenceHandler', (context, event) => {
        
        let currentPresence = event.value
        if (currentPresence == 'present') {
        if (GarageDoorPosition == 'closed') {
        
        context.api.devices.sendCommands(context.config.GarageDoorOpener, 'switch', on)
    
        
        context.api.devices.sendCommands(context.config.GarageDoorOpener, 'switch', off)
    
        }
        }
        

	})

    .subscribedEventHandler('contactOpenHandler', (context, event) => {
        
        let GarageDoorPosition = event.value
        

	})
