
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When one of these people arrive at home', section => {
            section.deviceSetting('people').capability(['presenceSensor']).name('');

        });


        page.section('Turn on these switches', section => {
            section.deviceSetting('switches').capability(['switch']).name('Switches?');

        });


        page.section('Turn on these dimmers', section => {
            section.deviceSetting('dimmers').capability(['switchLevel']).name('Dimmers?');

        });


        page.section('Only after sunset', section => {
            section.enumSetting('onlyDark').name('Only when dark?');

        });


        page.section('Then turn them off in (defaults to keep them on)', section => {

        });


        page.section('Unless the person was gone less than (defaults to 10 min)', section => {

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
        let threshold = falseAlarmThreshold != null && falseAlarmThreshold != '' ? ((falseAlarmThreshold * 60 * 1000) as Long) : 10 * 60 * 1000
        let t0 = new Date(this.now() - threshold )
        if (event.value == 'present') {
        let person = this.getPerson(evt)
        let recentNotPresent = person.statesSince('presence', t0).find({
        it.value == 'not present'
        })
        if (recentNotPresent) {
        console.log("skipping notification of arrival of ${person.displayName} because last departure was only ${(this.now() - recentNotPresent.date.time)} msec ago")
        } else {
        if (onlyDark == 'Yes' && this.getSunriseAndSunset().sunset.time > this.now()) {
        console.log('not turning on any switches because it is not yet sunset.')
        } else {
        let message = "${person.displayName} arrived at home, turning on requested switches."
        log.info(message)
        this.sendNotificationEvent(message)
        this.send(message)
        switches?.on()
        dimmers?.setLevel(99)
        if (offThreshold != null && offThreshold != '' && offThreshold > 0) {
        this.runIn(60 * offThreshold , switchesOff)
        }
        }
        }
        }
        

	})
