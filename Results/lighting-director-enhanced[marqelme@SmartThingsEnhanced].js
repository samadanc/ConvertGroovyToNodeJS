
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {
            section.timeSetting('A_timeStart').name('Starting');
            section.timeSetting('A_timeEnd').name('Ending');

        });


        page.section('', section => {
            section.timeSetting('B_timeStart').name('Starting');
            section.timeSetting('B_timeEnd').name('Ending');

        });


        page.section('', section => {
            section.timeSetting('C_timeStart').name('Starting');
            section.timeSetting('C_timeEnd').name('Ending');

        });


        page.section('', section => {
            section.timeSetting('D_timeStart').name('Starting');
            section.timeSetting('D_timeEnd').name('Ending');

        });


    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('onPressA', (context, event) => {
        
        if (!A_mode || A_mode.contains(location.mode) && this.getTimeOk(A_timeStart, A_timeEnd) && this.getDayOk(A_day)) {
        if (!A_luxSensors || A_luxSensors.latestValue('illuminance') <= A_turnOnLux ) {
        if (!A_triggerOnce || A_triggerOnce && !state.A_triggered && !A_switchDisable || A_switchDisable && !state.A_triggered) {
        if (event.physical) {
        state.A_triggered = true
        this.unschedule(delayTurnOffA)
        this.runOnce(this.getMidnight(), midNightReset)
        console.log("Physical switch in '$ScenarioNameA' pressed. Triggers for this scenario disabled.")
        }
        }
        }
        }
        

	})

    .subscribedEventHandler('onEventA', (context, event) => {
        
        if (!A_triggerOnce || A_triggerOnce && !state.A_triggered && !A_switchDisable || A_switchDisable && !state.A_triggered) {
        if (!A_mode || A_mode.contains(location.mode) && this.getTimeOk(A_timeStart, A_timeEnd) && this.getDayOk(A_day)) {
        if (!A_luxSensors || A_luxSensors.latestValue('illuminance') <= A_turnOnLux ) {
        let A_levelOn = (A_level as Integer)
        if (this.getInputOk(A_motion, A_contact, A_lock, A_acceleration)) {
        console.log("Motion, Door Open or Unlock Detected Running '$ScenarioNameA'")
        settings.A_switches?.on()
        settings.A_dimmers?.setLevel(A_levelOn)
        if (A_temps) {
        settings.A_temps?.setColorTemperature(A_tempscolor)
        }
        if (A_colors) {
        settings.A_colors?.setHue(A_colorsHue)
        settings.A_colors?.setSaturation(A_colorsSat)
        }
        if (A_triggerOnce) {
        state.A_triggered = true
        if (!A_turnOff) {
        this.runOnce(this.getMidnight(), midNightReset)
        }
        }
        if (state.A_timerStart) {
        this.unschedule(delayTurnOffA)
        state.A_timerStart = false
        }
        } else {
        if (settings.A_turnOff) {
        this.runIn(A_turnOff * 60, 'delayTurnOffA')
        state.A_timerStart = true
        } else {
        settings.A_switches?.off()
        if (state.A_triggered) {
        this.runOnce(this.getMidnight(), midNightReset)
        }
        }
        }
        }
        } else {
        console.log('Motion, Contact or Unlock detected outside of mode or time/day restriction. Not running scenario.')
        }
        }
        

	})
