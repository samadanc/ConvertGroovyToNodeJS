
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {

        });


        page.section(''Instructions'', section => {

        });


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


        page.section('', section => {
            section.numberSetting('A_levelDimOn').name('On Level');
            section.numberSetting('A_levelDimOff').name('Off Level');
            section.booleanSetting('A_calcOn').name('Calculate \');

        });


        page.section('', section => {
            section.numberSetting('B_levelDimOn').name('On Level');
            section.numberSetting('B_levelDimOff').name('Off Level');
            section.booleanSetting('B_calcOn').name('Calculate \');

        });


        page.section('', section => {
            section.numberSetting('C_levelDimOn').name('On Level');
            section.numberSetting('C_levelDimOff').name('Off Level');
            section.booleanSetting('C_calcOn').name('Calculate \');

        });


        page.section('', section => {
            section.numberSetting('D_levelDimOn').name('On Level');
            section.numberSetting('D_levelDimOff').name('Off Level');
            section.booleanSetting('D_calcOn').name('Calculate \');

        });


        page.section('', section => {
            section.enumSetting('A_color').name('Choose a color');
            section.numberSetting('A_levelDimOnColor').name('On Level');
            section.numberSetting('A_levelDimOffColor').name('Off Level');
            section.booleanSetting('A_calcOnColor').name('Calculate \');

        });


        page.section('', section => {
            section.enumSetting('B_color').name('Choose a color');
            section.numberSetting('B_levelDimOnColor').name('On Level');
            section.numberSetting('B_levelDimOffColor').name('Off Level');
            section.booleanSetting('B_calcOnColor').name('Calculate \');

        });


        page.section('', section => {
            section.enumSetting('C_color').name('Choose a color');
            section.numberSetting('C_levelDimOnColor').name('On Level');
            section.numberSetting('C_levelDimOffColor').name('Off Level');
            section.booleanSetting('C_calcOnColor').name('Calculate \');

        });


        page.section('', section => {
            section.enumSetting('D_color').name('Choose a color');
            section.numberSetting('D_levelDimOnColor').name('On Level');
            section.numberSetting('D_levelDimOffColor').name('Off Level');
            section.booleanSetting('D_calcOnColor').name('Calculate \');

        });


    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('onPressC', (context, event) => {
        
        if (!C_mode || C_mode.contains(location.mode) && this.getTimeOk(C_timeStart, C_timeEnd) && this.getDayOk(C_day)) {
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
        if (!D_mode || D_mode.contains(location.mode) && this.getTimeOk(D_timeStart, D_timeEnd) && this.getDayOk(D_day)) {
        if (!D_luxSensors || D_luxSensors.latestValue('illuminance') <= D_turnOnLux ) {
        if (D_motion.latestValue('motion').contains('active')) {
        console.log("Motion Detected Running '$ScenarioNameD'")
        let levelSetOn = D_levelDimOn ? D_levelDimOn : 100
        let levelSetOnColor = D_levelDimOnColor ? D_levelDimOnColor : 100
        let levelSetOff = D_levelDimOff ? D_levelDimOff : 0
        let levelSetOffColor = D_levelDimOffColor ? D_levelDimOffColor : 0
        if (D_calcOn && D_luxSensors ) {
        levelSetOn = levelSetOn * 1 - D_luxSensors.latestValue('illuminance') / D_turnOnLux + levelSetOff
        if (levelSetOn > 100) {
        levelSetOn = 100
        }
        }
        if (D_calcOnColor && D_luxSensors ) {
        levelSetOnColor = levelSetOnColor * 1 - D_luxSensors.latestValue('illuminance') / D_turnOnLux + levelSetOffColor
        if (levelSetOnColor > 100) {
        levelSetOnColor = 100
        }
        }
        D_dimmers?.setLevel(levelSetOn)
        this.setColoredLights(D_colorControls, D_color, levelSetOnColor)
        D_switches?.on()
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
        if (D_turnOff) {
        this.runIn(D_turnOff * 60, 'delayTurnOffD')
        state.D_timerStart = true
        } else {
        D_switches?.off()
        let levelSetOff = D_levelDimOff ? D_levelDimOff : 0
        D_dimmers?.setLevel(levelSetOff)
        let levelSetOffColor = D_levelDimOffColor ? D_levelDimOffColor : 0
        D_colorControls.setLevel(levelSetOffColor)
        if (state.D_triggered) {
        this.runOnce(this.getMidnight(), midNightReset)
        }
        }
        }
        }
        } else {
        console.log('Motion outside of mode or time/day restriction.  Not running scenario.')
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
        console.log("Physical switch in '$ScenarioNameA' pressed. Trigger for this scenario disabled.")
        }
        }
        }
        }
        

	})

    .subscribedEventHandler('onEventB', (context, event) => {
        
        if (!B_triggerOnce || B_triggerOnce && !state.B_triggered && !B_switchDisable || B_switchDisable && !state.B_triggered) {
        if (!B_mode || B_mode.contains(location.mode) && this.getTimeOk(B_timeStart, B_timeEnd) && this.getDayOk(B_day)) {
        if (!B_luxSensors || B_luxSensors.latestValue('illuminance') <= B_turnOnLux ) {
        if (B_motion.latestValue('motion').contains('active')) {
        console.log("Motion Detected Running '$ScenarioNameB'")
        let levelSetOn = B_levelDimOn ? B_levelDimOn : 100
        let levelSetOnColor = B_levelDimOnColor ? B_levelDimOnColor : 100
        let levelSetOff = B_levelDimOff ? B_levelDimOff : 0
        let levelSetOffColor = B_levelDimOffColor ? B_levelDimOffColor : 0
        if (B_calcOn && B_luxSensors ) {
        levelSetOn = levelSetOn * 1 - B_luxSensors.latestValue('illuminance') / B_turnOnLux + levelSetOff
        if (levelSetOn > 100) {
        levelSetOn = 100
        }
        }
        if (B_calcOnColor && B_luxSensors ) {
        levelSetOnColor = levelSetOnColor * 1 - B_luxSensors.latestValue('illuminance') / B_turnOnLux + levelSetOffColor
        if (levelSetOnColor > 100) {
        levelSetOnColor = 100
        }
        }
        B_dimmers?.setLevel(levelSetOn)
        this.setColoredLights(B_colorControls, B_color, levelSetOnColor)
        B_switches?.on()
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
        if (B_turnOff) {
        this.runIn(B_turnOff * 60, 'delayTurnOffB')
        state.B_timerStart = true
        } else {
        B_switches?.off()
        let levelSetOff = B_levelDimOff ? B_levelDimOff : 0
        B_dimmers?.setLevel(levelSetOff)
        let levelSetOffColor = B_levelDimOffColor ? B_levelDimOffColor : 0
        B_colorControls?.setLevel(levelSetOffColor)
        if (state.B_triggered) {
        this.runOnce(this.getMidnight(), midNightReset)
        }
        }
        }
        }
        } else {
        console.log('Motion outside of mode or time/day restriction.  Not running scenario.')
        }
        }
        

	})

    .subscribedEventHandler('onPressD', (context, event) => {
        
        if (!D_mode || D_mode.contains(location.mode) && this.getTimeOk(D_timeStart, D_timeEnd) && this.getDayOk(D_day)) {
        if (!D_luxSensors || D_luxSensors.latestValue('illuminance') <= D_turnOnLux ) {
        if (!D_triggerOnce || D_triggerOnce && !state.D_triggered && !D_switchDisable || D_switchDisable && !state.D_triggered) {
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
        if (A_motion.latestValue('motion').contains('active')) {
        console.log("Motion Detected Running '$ScenarioNameA'")
        let levelSetOn = A_levelDimOn ? A_levelDimOn : 100
        let levelSetOnColor = A_levelDimOnColor ? A_levelDimOnColor : 100
        let levelSetOff = A_levelDimOff ? A_levelDimOff : 0
        let levelSetOffColor = A_levelDimOffColor ? A_levelDimOffColor : 0
        if (A_calcOn && A_luxSensors ) {
        levelSetOn = levelSetOn * 1 - A_luxSensors.latestValue('illuminance') / A_turnOnLux + levelSetOff
        if (levelSetOn > 100) {
        levelSetOn = 100
        }
        }
        if (A_calcOnColor && A_luxSensors ) {
        levelSetOnColor = levelSetOnColor * 1 - A_luxSensors.latestValue('illuminance') / A_turnOnLux + levelSetOffColor
        if (levelSetOnColor > 100) {
        levelSetOnColor = 100
        }
        }
        A_dimmers?.setLevel(levelSetOn)
        this.setColoredLights(A_colorControls, A_color, levelSetOnColor)
        A_switches?.on()
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
        if (A_turnOff) {
        this.runIn(A_turnOff * 60, 'delayTurnOffA')
        state.A_timerStart = true
        } else {
        A_switches?.off()
        let levelSetOff = A_levelDimOff ? A_levelDimOff : 0
        A_dimmers?.setLevel(levelSetOff)
        let levelSetOffColor = A_levelDimOffColor ? A_levelDimOffColor : 0
        A_colorControls?.setLevel(levelSetOffColor)
        if (state.A_triggered) {
        this.runOnce(this.getMidnight(), midNightReset)
        }
        }
        }
        }
        } else {
        console.log('Motion outside of mode or time/day restriction.  Not running scenario.')
        }
        }
        

	})

    .subscribedEventHandler('onEventC', (context, event) => {
        
        if (!C_triggerOnce || C_triggerOnce && !state.C_triggered && !C_switchDisable || C_switchDisable && !state.C_triggered) {
        if (!C_mode || C_mode.contains(location.mode) && this.getTimeOk(C_timeStart, C_timeEnd) && this.getDayOk(C_day)) {
        if (!C_luxSensors || C_luxSensors.latestValue('illuminance') <= C_turnOnLux ) {
        if (C_motion.latestValue('motion').contains('active')) {
        console.log("Motion Detected Running '$ScenarioNameC'")
        let levelSetOn = C_levelDimOn ? C_levelDimOn : 100
        let levelSetOnColor = C_levelDimOnColor ? C_levelDimOnColor : 100
        let levelSetOff = C_levelDimOff ? C_levelDimOff : 0
        let levelSetOffColor = C_levelDimOffColor ? C_levelDimOffColor : 0
        if (C_calcOn && C_luxSensors ) {
        levelSetOn = levelSetOn * 1 - C_luxSensors.latestValue('illuminance') / C_turnOnLux + levelSetOff
        if (levelSetOn > 100) {
        levelSetOn = 100
        }
        }
        if (C_calcOnColor && C_luxSensors ) {
        levelSetOnColor = levelSetOnColor * 1 - C_luxSensors.latestValue('illuminance') / C_turnOnLux + levelSetOffColor
        if (levelSetOnColor > 100) {
        levelSetOnColor = 100
        }
        }
        C_dimmers?.setLevel(levelSetOn)
        this.setColoredLights(C_colorControls, C_color, levelSetOnColor)
        C_switches?.on()
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
        if (C_turnOff) {
        this.runIn(C_turnOff * 60, 'delayTurnOffC')
        state.C_timerStart = true
        } else {
        C_switches?.off()
        let levelSetOff = C_levelDimOff ? C_levelDimOff : 0
        C_dimmers?.setLevel(levelSetOff)
        let levelSetOffColor = C_levelDimOffColor ? C_levelDimOffColor : 0
        C_colorControls?.setLevel(levelSetOffColor)
        if (state.C_triggered) {
        this.runOnce(this.getMidnight(), midNightReset)
        }
        }
        }
        }
        } else {
        console.log('Motion outside of mode or time/day restriction.  Not running scenario.')
        }
        }
        

	})
