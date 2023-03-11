
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {
            section.timeSetting('A_timeStart').name('Starting');
            section.timeSetting('A_timeEnd').name('Ending');

        });


    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('onEventA', (context, event) => {
        
        if (!state.A_triggered) {
        if (!A_mode || A_mode.contains(location.mode) && this.getTimeOk(A_timeStart, A_timeEnd) && this.getDayOk(A_day)) {
        if (!A_luxSensors || A_luxSensors.latestValue('illuminance') <= A_turnOnLux ) {
        let A_levelOn = (A_level as Integer)
        if (this.getInputOk(A_motion, A_contact, A_lock, A_acceleration)) {
        console.log("Motion, Door Open or Unlock Detected Running '$ScenarioNameA'")
        settings.A_dimmers?.setLevel(A_levelOn)
        settings.A_switches?.on()
        if (A_triggerOnce) {
        state.A_triggered = true
        if (!A_turnOff) {
        this.runOnce(this.getMidnight(), midNightReset)
        }
        }
        if (state.A_timerStart) {
        log.info('Unscheduled the timer')
        this.unschedule(delayTurnOffA)
        state.A_timerStart = false
        }
        } else {
        if (settings.A_turnOff) {
        this.runIn(A_turnOff, 'delayTurnOffA')
        log.info("Setting a delay for turnoff of $A_turnOff : seconds")
        state.A_timerStart = true
        } else {
        settings.A_switches?.off()
        settings.A_dimmers?.setLevel(0)
        if (state.A_triggered) {
        this.runOnce(this.getMidnight(), midNightReset)
        }
        }
        }
        }
        } else {
        console.log('Motion, Contact or Unlock detected outside of mode or time/day restriction.  Not running scenario.')
        }
        }
        

	})
