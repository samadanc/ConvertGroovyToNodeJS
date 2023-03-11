
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
            section.numberSetting('A_levelDimOn').name('On Level');
            section.numberSetting('A_levelDimOff').name('Off Level');
            section.booleanSetting('A_calcOn').name('Calculate \');

        });


        page.section('', section => {
            section.enumSetting('A_colorOn').name('Choose a color when on');
            section.numberSetting('A_levelDimOnColor').name('On Level');
            section.enumSetting('A_colorOff').name('Choose a color when off');
            section.numberSetting('A_levelDimOffColor').name('Off Level');
            section.booleanSetting('A_calcOnColor').name('Calculate \');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunrise', 'sunriseHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunset', 'sunsetHandler')

    })

    .subscribedEventHandler('sunriseHandler', (context, event) => {
        
        state.sunSet = false
        if (A_turnOffSR) {
        A_dimmers?.off()
        this.unschedule(delayTurnOffA)
        state.A_timerStart = false
        }
        

	})

    .subscribedEventHandler('sunsetHandler', (context, event) => {
        
        state.sunSet = true
        

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

    .subscribedEventHandler('turnOffLuxA', (context, event) => {
        
        if (A_luxSensors.latestValue('illuminance') > A_turnOnLux ) {
        A_dimmers?.off()
        this.unschedule(delayTurnOffA)
        state.A_timerStart = false
        }
        

	})

    .subscribedEventHandler('onEventA', (context, event) => {
        
        if (!A_triggerOnce || A_triggerOnce && !state.A_triggered && !A_switchDisable || A_switchDisable && !state.A_triggered) {
        if (!A_mode || A_mode.contains(location.mode) && this.getTimeOk(A_timeStart, A_timeEnd) && this.getDayOk(A_day) && state.sunSet) {
        if (!A_luxSensors || A_luxSensors.latestValue('illuminance') <= A_turnOnLux ) {
        if (A_motion.latestValue('motion').contains('active')) {
        console.log('Motion Detected')
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
        A_dimmers?.setLevel((levelSetOn as int))
        this.setColoredLights(A_colorControls, A_colorOn, (levelSetOnColor as int))
        A_switches?.on()
        if (A_triggerOnce && !A_triggerOnceOff) {
        state.A_triggered = true
        if (!A_turnOff) {
        this.runOnce(this.getMidnight(), midNightReset)
        }
        }
        if (state.A_timerStart) {
        this.unschedule()
        state.A_timerStart = false
        }
        } else {
        if (A_turnOff) {
        this.runIn(A_turnOff * 60, 'delayTurnOffA')
        state.A_timerStart = true
        } else {
        if (A_triggerOnce && A_triggerOnceOff ) {
        state.A_triggered = true
        }
        A_switches?.off()
        let levelSetOff = A_levelDimOff ? A_levelDimOff : 0
        A_dimmers?.setLevel((levelSetOff as int))
        let levelSetOffColor = A_levelDimOffColor ? A_levelDimOffColor : 0
        let offColor = A_colorOff ? A_colorOff : A_colorOn
        this.setColoredLights(A_colorControls, offColor, (levelSetOffColor as int))
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
