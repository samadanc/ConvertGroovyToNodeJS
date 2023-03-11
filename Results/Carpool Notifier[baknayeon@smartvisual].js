
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {
            section.deviceSetting('driver').capability(['presenceSensor']).name('When this person arrives');
            section.textSetting('message').name('With the message:');
            section.deviceSetting('rider').capability(['presenceSensor']).name('But only when this person is not with you');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.driver, 'presenceSensor', 'presence.present', 'presence')

    })

    .subscribedEventHandler('presence', (context, event) => {
        
        if (event.value == 'present' && this.riderIsHome()) {
        this.sendText()
        }
        

	})
