
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When these people leave...', section => {
            section.deviceSetting('people').capability(['presenceSensor']).name('');

        });


        page.section('Send this message', section => {
            section.textSetting('message').name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.people, 'presenceSensor', 'presence', 'presence')

    })

    .subscribedEventHandler('presence', (context, event) => {
        
        console.log("event.name: ${event.value}")
        if (event.value == 'not present') {
        console.log('checking if everyone is away')
        if (this.everyoneIsAway() && !(this.alarmArmedForAway())) {
        console.log('starting sequence')
        this.sendPush(message)
        }
        } else {
        console.log('present; doing nothing')
        }
        

	})
