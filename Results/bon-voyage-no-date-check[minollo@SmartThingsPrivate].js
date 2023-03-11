
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Poller device...', section => {
            section.deviceSetting('pollerDevice').capability(['battery']).name('');

        });


        page.section('When all of these people leave home', section => {
            section.deviceSetting('people').capability(['presenceSensor']).name('');

        });


        page.section('Change to this mode', section => {

        });


        page.section('When any of them comes back, set this mode', section => {

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
        if (event.value == 'not present') {
        if (location.currentMode.name != awayMode ) {
        console.log('checking if everyone is away')
        if (this.everyoneIsAway()) {
        console.log('starting sequence')
        let delay = falseAlarmThreshold != null ? falseAlarmThreshold * 60 : 10 * 60
        state.presenceChangeTime = this.now()
        this.runIn(delay, 'takeAction')
        }
        } else {
        console.log('mode is the same, not evaluating')
        }
        } else {
        console.log('canceling')
        state.presenceChangeTime = null
        this.unschedule('takeAction')
        if (location.currentMode.name == awayMode ) {
        location.setMode(backMode)
        }
        }
        

	})
