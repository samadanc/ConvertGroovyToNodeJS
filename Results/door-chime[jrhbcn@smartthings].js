
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Preferences:', section => {
            section.deviceSetting('thedoor').capability(['contactSensor']).name('Door?');
            section.deviceSetting('thesiren').capability(['alarm']).name('Siren?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.thedoor, 'contactSensor', 'contact.open', 'contactHandler')

    })

    .subscribedEventHandler('contactHandler', (context, event) => {
        
        console.log("door chime contactHandler called: $evt")
        
        context.api.devices.sendCommands(context.config.thesiren, 'alarm', DoorChime)
    
        

	})
