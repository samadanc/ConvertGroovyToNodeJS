
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When one of these people arrive at home', section => {
            section.deviceSetting('people').capability(['presenceSensor']).name('');

        });


        page.section('Change to this mode', section => {

        });


        page.section('And text me at (optional)', section => {

        });


        page.section('False alarm threshold (defaults to 10 min)', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.people, 'presenceSensor', 'presence', 'presence')

    })

    .subscribedEventHandler('presence', (context, event) => {
        
        console.log("event.name: ${event.value}")
        let threshold = falseAlarmThreshold != null ? ((falseAlarmThreshold * 60 * 1000) as Long) : 10 * 60 * 1000
        if (location.mode != newMode ) {
        let t0 = new Date(this.now() - threshold )
        if (event.value == 'present') {
        let person = this.getPerson(evt)
        let recentNotPresent = person.statesSince('presence', t0).find({
        it.value == 'not present'
        })
        if (recentNotPresent) {
        console.log("skipping notification of arrival of ${person.displayName} because last departure was only ${(this.now() - recentNotPresent.date.time)} msec ago")
        } else {
        let message = "${person.displayName} arrived at home, changing mode to '$newMode'"
        log.info(message)
        this.sendPush(message)
        if (phone) {
        this.sendSms(phone, message)
        }
        this.setLocationMode(newMode)
        }
        }
        } else {
        console.log('mode is the same, not evaluating')
        }
        

	})
