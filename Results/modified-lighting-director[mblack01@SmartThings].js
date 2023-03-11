
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
        
        if (!C_mode || C_mode.contains(location.mode) && this.getTimeOk(C_timeStart, C_timeEnd) && this.getDayOk(C_day)) {
        if (event.value == 'on' && !state.onByThisApp) {
        state.isLightOn = true
        log.info('The light status was change to ON')
        } else {
        if (event.value == 'off' && !state.onByThisApp) {
        state.isLightOn = false
        log.info('The light status was change to OFF')
        }
        }
        if (!C_luxSensors || C_luxSensors.latestValue('illuminance') <= C_turnOnLux ) {
        log.info('In onPressC')
        if (event.type == 'physical') {
        console.log("C - The value of this event is ${event.value}")
        console.log("C - The value of this event description is ${event.description}")
        console.log("C - The value of this event text is ${event.descriptionText}")
        console.log("C - The value of this event TYPE is ${event.type}")
        state.myCounter = state.myCounter + 1
        log.info("Value of state.myCounter is ${state.myCounter}")
        this.runIn(7, 'resetMyCounter')
        if (state.myCounter == 2) {
        log.info('CHANGING a_triggered state because on button was pressed twice')
        if (!state.C_triggered) {
        state.C_triggered = true
        this.unschedule(delayTurnOffC)
        console.log("Physical switch in '$ScenarioNameC' pressed. Triggers for this scenario DISABLED.")
        } else {
        if (state.C_triggered) {
        log.info('CHANGING C_triggered state because on button was pressed twice')
        state.C_triggered = false
        this.runIn(C_turnOff, 'delayTurnOffC')
        console.log("Physical switch in '$ScenarioNameC' pressed. Triggers for this scenario ENABLED.")
        }
        }
        }
        }
        }
        }
        

	})

    .subscribedEventHandler('onEventD', (context, event) => {
        
        if (!state.isLightOn && !D_switchDisable || D_switchDisable && !state.D_triggered) {
        if (!D_mode || D_mode.contains(location.mode) && this.getTimeOk(D_timeStart, D_timeEnd) && this.getDayOk(D_day)) {
        console.log("IN EVENT D - CHECK :: is the light already on by another app? ${state.isLightOn}")
        if (!D_luxSensors || D_luxSensors.latestValue('illuminance') <= D_turnOnLux ) {
        let D_levelOn = (D_level as Integer)
        if (this.getInputOk(D_motion, D_contact, D_lock, D_acceleration) || event.value == 'present') {
        console.log("Presence, Motion, Door Open or Unlock Detected Running '$ScenarioNameD'")
        settings.D_dimmers?.setLevel(D_levelOn)
        settings.D_switches?.on()
        state.onByThisApp = true
        console.log("TURNED ON ${settings.D_dimmers} and set state.onByThisApp to ${state.onByThisApp}")
        if (state.D_timerStart) {
        console.log('UNSCHEDULED TIMER')
        this.unschedule(delayTurnOffD)
        state.D_timerStart = false
        }
        } else {
        if (settings.D_turnOff) {
        console.log("STARTING TURN OFF TIME OF $D_turnOff")
        this.runIn(D_turnOff, 'delayTurnOffD')
        state.D_timerStart = true
        } else {
        settings.D_switches?.off()
        settings.D_dimmers?.setLevel(0)
        state.onByThisApp = false
        }
        }
        }
        }
        }
        

	})

    .subscribedEventHandler('onPressA', (context, event) => {
        
        if (!A_mode || A_mode.contains(location.mode) && this.getTimeOk(A_timeStart, A_timeEnd) && this.getDayOk(A_day)) {
        if (event.value == 'on' && !state.onByThisApp) {
        state.isLightOn = true
        log.info('The light status was change to ON')
        } else {
        if (event.value == 'off' && !state.onByThisApp) {
        state.isLightOn = false
        log.info('The light status was change to OFF')
        }
        }
        if (!A_luxSensors || A_luxSensors.latestValue('illuminance') <= A_turnOnLux ) {
        log.info('In onPressA')
        if (event.type == 'physical') {
        console.log("A - The value of this event is ${event.value}")
        console.log("A - The value of this event description is ${event.description}")
        console.log("A - The value of this event text is ${event.descriptionText}")
        console.log("A - The value of this event TYPE is ${event.type}")
        state.myCounter = state.myCounter + 1
        log.info("Value of state.myCounter is ${state.myCounter}")
        this.runIn(7, 'resetMyCounter')
        if (state.myCounter == 2) {
        log.info('CHANGING a_triggered state because on button was pressed twice')
        if (!state.A_triggered) {
        state.A_triggered = true
        this.unschedule(delayTurnOffA)
        console.log("Physical switch in '$ScenarioNameA' pressed. Triggers for this scenario DISABLED.")
        } else {
        if (state.A_triggered) {
        log.info('CHANGING a_triggered state because on button was pressed twice')
        state.A_triggered = false
        this.runIn(A_turnOff, 'delayTurnOffA')
        console.log("Physical switch in '$ScenarioNameA' pressed. Triggers for this scenario ENABLED.")
        }
        }
        }
        }
        }
        }
        

	})

    .subscribedEventHandler('onEventB', (context, event) => {
        
        if (!state.isLightOn && !B_switchDisable || B_switchDisable && !state.B_triggered) {
        if (!B_mode || B_mode.contains(location.mode) && this.getTimeOk(B_timeStart, B_timeEnd) && this.getDayOk(B_day)) {
        console.log("IN EVENT B - CHECK :: is the light already on by another app? ${state.isLightOn}")
        if (!B_luxSensors || B_luxSensors.latestValue('illuminance') <= B_turnOnLux ) {
        let B_levelOn = (B_level as Integer)
        if (this.getInputOk(B_motion, B_contact, B_lock, B_acceleration) || event.value == 'present') {
        console.log("Presence, Motion, Door Open or Unlock Detected Running '$ScenarioNameB'")
        settings.B_dimmers?.setLevel(B_levelOn)
        settings.B_switches?.on()
        state.onByThisApp = true
        console.log("TURNED ON ${settings.B_dimmers} and set state.onByThisApp to ${state.onByThisApp}")
        if (state.B_timerStart) {
        console.log('UNSCHEDULED TIMER')
        this.unschedule(delayTurnOffB)
        state.B_timerStart = false
        }
        } else {
        if (settings.B_turnOff) {
        console.log("STARTING TURN OFF TIME OF $B_turnOff")
        this.runIn(B_turnOff, 'delayTurnOffB')
        state.B_timerStart = true
        } else {
        settings.B_switches?.off()
        settings.B_dimmers?.setLevel(0)
        state.onByThisApp = false
        }
        }
        }
        }
        }
        

	})

    .subscribedEventHandler('onPressD', (context, event) => {
        
        if (!D_mode || D_mode.contains(location.mode) && this.getTimeOk(D_timeStart, D_timeEnd) && this.getDayOk(D_day)) {
        if (event.value == 'on' && !state.onByThisApp) {
        state.isLightOn = true
        log.info('The light status was change to ON')
        } else {
        if (event.value == 'off' && !state.onByThisApp) {
        state.isLightOn = false
        log.info('The light status was change to OFF')
        }
        }
        if (!D_luxSensors || D_luxSensors.latestValue('illuminance') <= D_turnOnLux ) {
        log.info('In onPressD')
        if (event.type == 'physical') {
        console.log("D - The value of this event is ${event.value}")
        console.log("D - The value of this event description is ${event.description}")
        console.log("D - The value of this event text is ${event.descriptionText}")
        console.log("D - The value of this event TYPE is ${event.type}")
        state.myCounter = state.myCounter + 1
        log.info("Value of state.myCounter is ${state.myCounter}")
        this.runIn(7, 'resetMyCounter')
        if (state.myCounter == 2) {
        log.info('CHANGING a_triggered state because on button was pressed twice')
        if (!state.D_triggered) {
        state.D_triggered = true
        this.unschedule(delayTurnOffD)
        console.log("Physical switch in '$ScenarioNameD' pressed. Triggers for this scenario DISABLED.")
        } else {
        if (state.D_triggered) {
        log.info('CHANGING D_triggered state because on button was pressed twice')
        state.D_triggered = false
        this.runIn(D_turnOff, 'delayTurnOffD')
        console.log("Physical switch in '$ScenarioNameD' pressed. Triggers for this scenario ENABLED.")
        }
        }
        }
        }
        }
        }
        

	})

    .subscribedEventHandler('onPressB', (context, event) => {
        
        if (!B_mode || B_mode.contains(location.mode) && this.getTimeOk(B_timeStart, B_timeEnd) && this.getDayOk(B_day)) {
        if (event.value == 'on' && !state.onByThisApp) {
        state.isLightOn = true
        log.info('The light status was change to ON')
        } else {
        if (event.value == 'off' && !state.onByThisApp) {
        state.isLightOn = false
        log.info('The light status was change to OFF')
        }
        }
        if (!B_luxSensors || B_luxSensors.latestValue('illuminance') <= B_turnOnLux ) {
        log.info('In onPressB')
        if (event.type == 'physical') {
        console.log("B - The value of this event is ${event.value}")
        console.log("B - The value of this event description is ${event.description}")
        console.log("B - The value of this event text is ${event.descriptionText}")
        console.log("B - The value of this event TYPE is ${event.type}")
        state.myCounter = state.myCounter + 1
        log.info("Value of state.myCounter is ${state.myCounter}")
        this.runIn(7, 'resetMyCounter')
        if (state.myCounter == 2) {
        log.info('CHANGING a_triggered state because on button was pressed twice')
        if (!state.B_triggered) {
        state.B_triggered = true
        this.unschedule(delayTurnOffB)
        console.log("Physical switch in '$ScenarioNameB' pressed. Triggers for this scenario DISABLED.")
        } else {
        if (state.B_triggered) {
        log.info('CHANGING B_triggered state because on button was pressed twice')
        state.B_triggered = false
        this.runIn(B_turnOff, 'delayTurnOffB')
        console.log("Physical switch in '$ScenarioNameB' pressed. Triggers for this scenario ENABLED.")
        }
        }
        }
        }
        }
        }
        

	})

    .subscribedEventHandler('onEventA', (context, event) => {
        
        if (!state.isLightOn && !A_switchDisable || A_switchDisable && !state.A_triggered) {
        if (!A_mode || A_mode.contains(location.mode) && this.getTimeOk(A_timeStart, A_timeEnd) && this.getDayOk(A_day)) {
        console.log("IN EVENT A - CHECK :: is the light already on by another app? ${state.isLightOn}")
        if (!A_luxSensors || A_luxSensors.latestValue('illuminance') <= A_turnOnLux ) {
        let A_levelOn = (A_level as Integer)
        if (this.getInputOk(A_motion, A_contact, A_lock, A_acceleration) || event.value == 'present') {
        console.log("Presence, Motion, Door Open or Unlock Detected Running '$ScenarioNameA'")
        settings.A_dimmers?.setLevel(A_levelOn)
        settings.A_switches?.on()
        state.onByThisApp = true
        console.log("TURNED ON ${settings.A_dimmers} and set state.onByThisApp to ${state.onByThisApp}")
        if (state.A_timerStart) {
        console.log('UNSCHEDULED TIMER')
        this.unschedule(delayTurnOffA)
        state.A_timerStart = false
        }
        } else {
        if (settings.A_turnOff) {
        console.log("STARTING TURN OFF TIME OF $A_turnOff")
        this.runIn(A_turnOff, 'delayTurnOffA')
        state.A_timerStart = true
        } else {
        settings.A_switches?.off()
        settings.A_dimmers?.setLevel(0)
        state.onByThisApp = false
        }
        }
        }
        }
        }
        

	})

    .subscribedEventHandler('onEventC', (context, event) => {
        
        if (!state.isLightOn && !C_switchDisable || C_switchDisable && !state.C_triggered) {
        if (!C_mode || C_mode.contains(location.mode) && this.getTimeOk(C_timeStart, C_timeEnd) && this.getDayOk(C_day)) {
        console.log("IN EVENT C - CHECK :: is the light already on by another app? ${state.isLightOn}")
        if (!C_luxSensors || C_luxSensors.latestValue('illuminance') <= C_turnOnLux ) {
        let C_levelOn = (C_level as Integer)
        if (this.getInputOk(C_motion, C_contact, C_lock, C_acceleration) || event.value == 'present') {
        console.log("Presence, Motion, Door Open or Unlock Detected Running '$ScenarioNameC'")
        settings.C_dimmers?.setLevel(C_levelOn)
        settings.C_switches?.on()
        state.onByThisApp = true
        console.log("TURNED ON ${settings.C_dimmers} and set state.onByThisApp to ${state.onByThisApp}")
        if (state.C_timerStart) {
        console.log('UNSCHEDULED TIMER')
        this.unschedule(delayTurnOffC)
        state.C_timerStart = false
        }
        } else {
        if (settings.C_turnOff) {
        console.log("STARTING TURN OFF TIME OF $C_turnOff")
        this.runIn(C_turnOff, 'delayTurnOffC')
        state.C_timerStart = true
        } else {
        settings.C_switches?.off()
        settings.C_dimmers?.setLevel(0)
        state.onByThisApp = false
        }
        }
        }
        }
        }
        

	})
