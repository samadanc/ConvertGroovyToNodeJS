
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When the door opens...', section => {
            section.deviceSetting('contact1').capability(['contactSensor']).name('Where?');

        });


        page.section('Turn on a light...', section => {
            section.deviceSetting('hues').capability(['colorControl']).name('');

        });


        page.section('Make Phone Talk...', section => {
            section.deviceSetting('phones').capability(['speechSynthesis']).name('');
            section.textSetting('message').name('Notification message');
            section.timeSetting('timeOfDay').name('After what time?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.contact1, 'contactSensor', 'contact.open', 'contactHandler')

    })

    .subscribedEventHandler('contactHandler', (context, event) => {
        
        if (true) {
        hues*.on()
        if (this.correctTime()) {
        phones*.speak(message)
        }
        }
        

	})
