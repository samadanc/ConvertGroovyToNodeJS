
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('False alarm thresholds (defaults to 0 mins for arrivals, 240 mins for departures)', section => {

        });


        page.section('Vacation Mode delay threshold (defaults to 24 hours after last departure)', section => {

        });


        page.section('Daytime Routines Start and Stop Times', section => {
            section.timeSetting('timeA').name('Enter daytime routine start time:');
            section.timeSetting('timeB').name('Enter daytime routine stop time');

        });


        page.section('Notifications', section => {
            section.booleanSetting('sendPushMessage').name('Send notifications when house is empty?');
            section.booleanSetting('sendPushMessageHome').name('Send notifications when home is occupied?');

        });


        page.section('Send Notifications?', section => {

        });


        page.section('More options', section => {
            section.enumSetting('days').name('Only on certain days of the week');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('setDaytimeModeHandler', delay);

        context.api.schedules.schedule('setNighttimeModeHandler', delay);

    })

    .subscribedEventHandler('presence', (context, event) => {
        
        let homeMode = location.mode
        if (allOk) {
        if (event.value == 'not present') {
        console.log('Checking if everyone is away')
        if (this.everyoneIsAway()) {
        log.info('Nobody is home, running away sequence')
        let delay = falseAlarmThreshold != null && falseAlarmThreshold != '' ? falseAlarmThreshold * 60 : 240 * 60
        let vacationModeDelayinSeconds = vacationModeDelayThreshold ? vacationModeDelayThreshold * 3600 : 24 * 3600
        if (homeMode != 'Home-Bitter Cold') {
        this.runIn(delay, setAway)
        this.runIn(vacationModeDelayinSeconds, setVacationAway)
        state.setVacationAwayScheduled = true
        } else {
        this.runIn(vacationModeDelayinSeconds, setAway)
        }
        }
        } else {
        log.info('Someone is home, running home sequence')
        this.unschedule(scheduledSetAway)
        if (state.setVacationAwayScheduled) {
        this.unschedule(scheduledSetVacationAway)
        state.setVacationAwayScheduled = false
        }
        location.setMode('Home')
        this.setHome()
        state[event.deviceId] = this.now()
        }
        }
        

	})

    .scheduledEventHandler('setDaytimeModeHandler', (context, event) => {
        
        state.daytimeMode = 'daytime'
        console.log("Current time of day mode is ${state.daytimeMode}")
        

	})
