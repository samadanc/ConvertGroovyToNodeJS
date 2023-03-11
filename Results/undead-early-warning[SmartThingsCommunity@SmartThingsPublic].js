
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When the door opens...', section => {
            section.deviceSetting('contacts').capability(['contactSensor']).name('Where could they come from?');

        });


        page.section('Turn on the lights!', section => {
            section.deviceSetting('switches').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.contacts, 'contactSensor', 'contact.open', 'contactOpenHandler')

    })

    .subscribedEventHandler('contactOpenHandler', (context, event) => {
        
        console.log("${event.value}: $evt, $settings")
        log.trace("The Undead are coming! Turning on the lights: $switches")
        
        context.api.devices.sendCommands(context.config.switches, 'switch', on)
    
        

	})
