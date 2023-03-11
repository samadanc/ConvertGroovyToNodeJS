
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When the door opens...', section => {
            section.deviceSetting('contact1').capability(['contactSensor']).name('Where?');

        });


        page.section('Turn on a light...', section => {
            section.deviceSetting('switches').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.contact1, 'contactSensor', 'contact.open', 'contactOpenHandler')

    })

    .subscribedEventHandler('contactOpenHandler', (context, event) => {
        
        console.log("${event.value}: $evt, $settings")
        log.trace("Turning on switches: $switches")
        
        context.api.devices.sendCommands(context.config.switches, 'switch', on)
    
        

	})
