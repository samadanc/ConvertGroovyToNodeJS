
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When all of these people leave home', section => {
            section.deviceSetting('people').capability(['presenceSensor']).name('');

        });


        page.section('Change to this mode', section => {

        });


        page.section('False alarm threshold (defaults to 10 min)', section => {

        });


        page.section('Notifications', section => {
            section.enumSetting('sendPushMessage').name('Send a push notification?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.people, 'presenceSensor', 'presence', 'presence')

    })

    .subscribedEventHandler('presence', (context, event) => {
        
        console.log("event.name: ${event.value}")
        if (event.value == 'not present') {
        if (location.mode != newMode ) {
        console.log('checking if everyone is away')
        if (this.everyoneIsAway()) {
        console.log('starting sequence')
        this.runIn(this.findFalseAlarmThreshold() * 60, 'takeAction', ['overwrite': false])
        }
        } else {
        console.log('mode is the same, not evaluating')
        }
        } else {
        console.log('present; doing nothing')
        }
        

	})
