
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

    .subscribedEventHandler('onPressC', (context, event) => {
        
        if (!C_mode || C_mode.contains(location.mode) && this.getTimeOk(C_timeStart, C_timeEnd) && this.getDayOk(C_day) && !state.C_triggered) {
        if (!C_luxSensors || C_luxSensors.latestValue('illuminance') <= C_turnOnLux ) {
        if (!C_triggerOnce || C_triggerOnce && !state.C_triggered && !C_switchDisable || C_switchDisable && !state.C_triggered) {
        if (event.physical) {
        state.C_triggered = true
        this.unschedule(delayTurnOffC)
        this.runOnce(this.getMidnight(), midNightReset)
        console.log("Physical switch in '$ScenarioNameC' pressed. Triggers for this scenario disabled.")
        }
        }
        }
        }
        

	})

    .subscribedEventHandler('onEventD', (context, event) => {
        
        if (!D_triggerOnce || D_triggerOnce && !state.D_triggered && !D_switchDisable || D_switchDisable && !state.D_triggered) {
        if (!D_mode || D_mode.contains(location.mode) && this.getTimeOk(D_timeStart, D_timeEnd) && this.getDayOk(D_day) && !state.D_triggered) {
        if (!D_luxSensors || D_luxSensors.latestValue('illuminance') <= D_turnOnLux ) {
        let D_levelOn = (D_level as Integer)
        if (this.getInputOk(D_motion, D_contact, D_lock, D_acceleration) || event.value == 'present') {
        console.log("Presence, Motion, Door Open or Unlock Detected Running '$ScenarioNameD'")
        settings.D_dimmers?.setLevel(D_levelOn)
        settings.D_switches?.on()
        if (D_triggerOnce) {
        state.D_triggered = true
        if (!D_turnOff) {
        this.runOnce(this.getMidnight(), midNightReset)
        }
        }
        if (state.D_timerStart) {
        this.unschedule(delayTurnOffD)
        state.D_timerStart = false
        }
        } else {
        if (settings.D_turnOff) {
        this.runIn(D_turnOff * 60, 'delayTurnOffD')
        state.D_timerStart = true
        } else {
        settings.D_switches?.off()
        settings.D_dimmers?.setLevel(0)
        if (state.D_triggered) {
        this.runOnce(this.getMidnight(), midNightReset)
        }
        }
        }
        }
        } else {
        console.log('Presence, Motion, Contact or Unlock detected outside of mode or time/day restriction.  Not running scenario.')
        }
        }
        

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

    .subscribedEventHandler('onEventB', (context, event) => {
        
        if (!B_triggerOnce || B_triggerOnce && !state.B_triggered && !B_switchDisable || B_switchDisable && !state.B_triggered) {
        if (!B_mode || B_mode.contains(location.mode) && this.getTimeOk(B_timeStart, B_timeEnd) && this.getDayOk(B_day)) {
        if (!B_luxSensors || B_luxSensors.latestValue('illuminance') <= B_turnOnLux ) {
        let B_levelOn = (B_level as Integer)
        if (this.getInputOk(B_motion, B_contact, B_lock, B_acceleration) || event.value == 'present') {
        console.log("Presence, Motion, Door Open or Unlock Detected Running '$ScenarioNameB'")
        settings.B_dimmers?.setLevel(B_levelOn)
        settings.B_switches?.on()
        if (B_triggerOnce) {
        state.B_triggered = true
        if (!B_turnOff) {
        this.runOnce(this.getMidnight(), midNightReset)
        }
        }
        if (state.B_timerStart) {
        this.unschedule(delayTurnOffB)
        state.B_timerStart = false
        }
        } else {
        if (settings.B_turnOff) {
        this.runIn(B_turnOff * 60, 'delayTurnOffB')
        state.B_timerStart = true
        } else {
        settings.B_switches?.off()
        settings.B_dimmers?.setLevel(0)
        if (state.B_triggered) {
        this.runOnce(this.getMidnight(), midNightReset)
        }
        }
        }
        }
        } else {
        console.log('Presence, Motion, Contact or Unlock detected outside of mode or time/day restriction.  Not running scenario.')
        }
        }
        

	})

    .subscribedEventHandler('onPressD', (context, event) => {
        
        if (!D_mode || D_mode.contains(location.mode) && this.getTimeOk(D_timeStart, D_timeEnd) && this.getDayOk(D_day) && !state.D_triggered) {
        if (!D_luxSensors || D_luxSensors.latestValue('illuminance') <= D_turnOnLux ) {
        if (!D_triggerOnce || D_triggerOnce && !state.D_triggered && !D_switchDisable || D_switchDisable && !state.D_triggered) {
        if (event.physical) {
        state.D_triggered = true
        this.unschedule(delayTurnOffD)
        this.runOnce(this.getMidnight(), midNightReset)
        console.log("Physical switch in '$ScenarioNameD' pressed. Triggers for this scenario disabled.")
        }
        }
        }
        }
        

	})

    .subscribedEventHandler('onPressB', (context, event) => {
        
        if (!B_mode || B_mode.contains(location.mode) && this.getTimeOk(B_timeStart, B_timeEnd) && this.getDayOk(B_day)) {
        if (!B_luxSensors || B_luxSensors.latestValue('illuminance') <= B_turnOnLux ) {
        if (!B_triggerOnce || B_triggerOnce && !state.B_triggered && !B_switchDisable || B_switchDisable && !state.B_triggered) {
        if (event.physical) {
        state.B_triggered = true
        this.unschedule(delayTurnOffB)
        this.runOnce(this.getMidnight(), midNightReset)
        console.log("Physical switch in '$ScenarioNameB' pressed. Triggers for this scenario disabled.")
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
        if (this.getInputOk(A_motion, A_contact, A_lock, A_acceleration) || event.value == 'present') {
        console.log("Presence, Motion, Door Open or Unlock Detected Running '$ScenarioNameA'")
        settings.A_dimmers?.setLevel(A_levelOn)
        settings.A_switches?.on()
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
        settings.A_dimmers?.setLevel(0)
        if (state.A_triggered) {
        this.runOnce(this.getMidnight(), midNightReset)
        }
        }
        }
        }
        } else {
        console.log('Presence, Motion, Contact or Unlock detected outside of mode or time/day restriction.  Not running scenario.')
        }
        }
        

	})

    .subscribedEventHandler('onEventC', (context, event) => {
        
        if (!C_triggerOnce || C_triggerOnce && !state.C_triggered && !C_switchDisable || C_switchDisable && !state.C_triggered) {
        if (!C_mode || C_mode.contains(location.mode) && this.getTimeOk(C_timeStart, C_timeEnd) && this.getDayOk(C_day) && !state.C_triggered) {
        if (!C_luxSensors || C_luxSensors.latestValue('illuminance') <= C_turnOnLux ) {
        let C_levelOn = (settings.C_level as Integer)
        if (this.getInputOk(C_motion, C_contact, C_lock, C_acceleration) || event.value == 'present') {
        console.log("Presence, Motion, Door Open or Unlock Detected Running '$ScenarioNameC'")
        settings.C_dimmers?.setLevel(C_levelOn)
        settings.C_switches?.on()
        if (C_triggerOnce) {
        state.C_triggered = true
        if (!C_turnOff) {
        this.runOnce(this.getMidnight(), midNightReset)
        }
        }
        if (state.C_timerStart) {
        this.unschedule(delayTurnOffC)
        state.C_timerStart = false
        }
        } else {
        if (settings.C_turnOff) {
        this.runIn(C_turnOff * 60, 'delayTurnOffC')
        state.C_timerStart = true
        } else {
        settings.C_switches?.off()
        settings.C_dimmers?.setLevel(0)
        if (state.C_triggered) {
        this.runOnce(this.getMidnight(), midNightReset)
        }
        }
        }
        }
        } else {
        console.log('Presence, Motion, Contact or Unlock detected outside of mode or time/day restriction.  Not running scenario.')
        }
        }
        

	})
