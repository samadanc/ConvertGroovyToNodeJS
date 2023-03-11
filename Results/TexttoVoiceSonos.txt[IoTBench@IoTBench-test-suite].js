
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('This door is closed...', section => {
            section.deviceSetting('contact1').capability(['contactSensor']).name('Where?');

        });


        page.section('', section => {
            section.deviceSetting('sonos').capability(['musicPlayer']).name('Sonos Device');

        });


        page.section('', section => {
            section.textSetting('textHere').name('Type in the message');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.contact1, 'contactSensor', 'contact.closed', 'contactClosedHandler')

    })

    .subscribedEventHandler('contactClosedHandler', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.sonos, 'musicPlayer', playText)
    
        

	})
