
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When all of these people are at home:', section => {
            section.deviceSetting('peopleHome').capability(['presenceSensor']).name('');

        });


        page.section('When all of these people are away (optional):', section => {
            section.deviceSetting('peopleAway').capability(['presenceSensor']).name('');

        });


        page.section('Change to this mode', section => {

        });


        page.section('And text me at (optional)', section => {

        });


        page.section('or send SmartThings Notification (optional)', section => {
            section.enumSetting('pushNotification').name('Send SmartThings Notification?');

        });


        page.section('False alarm threshold (defaults to 10 min)', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.peopleHome, 'presenceSensor', 'presence', 'presence')

        await context.api.subscriptions.subscribeToDevices(context.config.peopleAway, 'presenceSensor', 'presence', 'presence')

    })

    .subscribedEventHandler('presence', (context, event) => {
        
        console.log("event.name: ${event.value}")
        if (location.mode != newMode ) {
        console.log('checking everyone\'s presence status')
        if (this.checkEveryone()) {
        console.log('starting sequence')
        let delay = falseAlarmThreshold != null ? falseAlarmThreshold * 60 : 10 * 60
        this.runIn(delay, 'takeAction')
        } else {
        console.log('canceling')
        this.unschedule('takeAction')
        }
        } else {
        console.log('mode is the same, not evaluating')
        }
        

	})
