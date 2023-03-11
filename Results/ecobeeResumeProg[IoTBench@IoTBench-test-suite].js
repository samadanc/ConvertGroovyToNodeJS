
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section(''About'', section => {

        });


        page.section('Resume Program at the ecobee thermostat(s)', section => {

        });


        page.section('When one of these people arrive at home', section => {
            section.deviceSetting('people').capability(['presenceSensor']).name('');

        });


        page.section('Or there is motion at home on these sensors [optional]', section => {
            section.deviceSetting('motions').capability(['motionSensor']).name('Where?');

        });


        page.section('False alarm threshold [defaults = 3 minutes]', section => {

        });


        page.section('Notifications', section => {
            section.enumSetting('sendPushMessage').name('Send a push notification?');

        });


        page.section('['mobileOnly': true]', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.motions, 'motionSensor', 'motion', 'motionEvtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.people, 'presenceSensor', 'presence', 'presence')

    })

    .subscribedEventHandler('motionEvtHandler', (context, event) => {
        
        if (event.value == 'active' && this.residentsHaveJustBeenActive()) {
        let message = 'EcobeeResumeProg>Recent motion just detected at home, do it'
        log.info(message)
        this.send(message)
        this.takeActions()
        }
        

	})

    .subscribedEventHandler('presence', (context, event) => {
        
        console.log("event.name: ${event.value}")
        let threshold = falseAlarmThreshold != null && falseAlarmThreshold != '' ? ((falseAlarmThreshold * 60 * 1000) as Long) : 3 * 60 * 1000
        let message
        let t0 = new Date(this.now() - threshold )
        if (event.value == 'present') {
        let person = this.getPerson(evt)
        if (person != null) {
        let recentNotPresent = person.statesSince('presence', t0).find({
        it.value == 'not present'
        })
        if (!recentNotPresent) {
        message = "EcobeeResumeProg>${person.displayName} just arrived,take actions.."
        log.info(message)
        this.send(message)
        this.takeActions()
        }
        } else {
        message = 'EcobeeResumeProg>somebody just arrived at home, but she/he is not been selected for resuming the ecobee program.'
        log.info(message)
        this.send(message)
        }
        }
        

	})
