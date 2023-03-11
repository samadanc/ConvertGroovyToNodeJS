
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunriseTime', 'sunriseTimeHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunsetTime', 'sunsetTimeHandler')

    })

    .subscribedEventHandler('sunsetTimeHandler', (context, event) => {
        
                if (state.debug) {
                    this.debugLog('sunsetTime Handler Started')
                }
                state.sunsetTime = location.currentValue('sunsetTime')
                if (state.debug) {
                    this.debugLog("sunsetTime set to: ${state.sunsetTime}")
                }
                if (state.debug) {
                    this.debugLog('sunsetTime Handler Ended')
                }
            

	})

    .subscribedEventHandler('SwitchHandler', (context, event) => {
        
                if (state.debug) {
                    this.debugLog('Switch Handler Triggered')
                }
                if (!state.ruleDisabled) {
                    switch (event.value) {
                        case 'on':
                            state.LightFading = false
                            if (event.isPhysical()) {
                                if (state.debug) {
                                    this.debugLog("Switch: ${event.displayName} turned on Manually")
                                }
                            } else {
                                if (state.debug) {
                                    this.debugLog("Switch: ${event.displayName} turned on Automatically")
                                }
                            }
                            break
                        case 'off':
                            state.LightFading = false
                            if (event.isPhysical()) {
                                if (state.debug) {
                                    this.debugLog("Switch: ${event.displayName} turned off Manually")
                                }
                            } else {
                                if (state.debug) {
                                    this.debugLog("Switch: ${event.displayName} turned off Automatically")
                                }
                            }
                            break
                    }
                } else {
                    if (state.debug) {
                        this.debugLog('Switch Handler doing nothing, rule is inactive')
                    }
                }
                if (state.debug) {
                    this.debugLog('Switch Handler Ended')
                }
            

	})

    .subscribedEventHandler('ButtonHandler', (context, event) => {
        
                if (!state.ruleDisabled) {
                    if (this.scheduleAllowed()) {
                        let buttonNumber = event.jsonData.buttonNumber
                        let value = event.value
                        if (state.debug) {
                            this.debugLog('Button Handler Started')
                            this.debugLog("button: $buttonNumber, value: $value")
                        }
                        if (LightOnButton == buttonNumber ) {
                            if (value == 'pushed') {
                                this.unschedule()
                                if (state.debug) {
                                    this.debugLog('Light On Button Pressed')
                                }
                                state.Fadelevel = LightSwitch.currentState('level').value.toInteger()
                                if (state.debug) {
                                    this.debugLog("Fade Level: ${state.Fadelevel}")
                                }
                                if (state.LightFading == false) {
                                    LightSwitch.on()
                                    state.Fadelevel = null
                                } else {
                                    LightSwitch.setLevel(state.Fadelevel)
                                    this.runIn(1, GuaranteeFade)
                                }
                                state.LightFading = false
                            }
                            if (value == 'held') {
                                state.Fadelevel = null
                                if (state.debug) {
                                    this.debugLog('Light On Button Held')
                                }
                                if (state.LightFading == false) {
                                    state.curLevel = LightSwitch.currentState('level').value.toInteger()
                                }
                                if (state.curLevel == null) {
                                    state.curLevel = 0
                                }
                                if (state.debug) {
                                    this.debugLog('Light Fade Up Button Pressed')
                                    this.debugLog("Light Level Before Fade Up: ${state.curLevel}")
                                }
                                state.LightFading = true
                                state.LightFadeIncrease = true
                                this.unschedule()
                                this.LightFade()
                            }
                        }
                        if (LightOffButton == buttonNumber ) {
                            if (value == 'pushed') {
                                this.unschedule()
                                if (state.debug) {
                                    this.debugLog('Light Off Button Pressed')
                                }
                                state.Fadelevel = LightSwitch.currentState('level').value.toInteger()
                                if (state.debug) {
                                    this.debugLog("Fade Level: ${state.Fadelevel}")
                                }
                                if (state.LightFading == false) {
                                    LightSwitch.off()
                                    state.Fadelevel = null
                                } else {
                                    LightSwitch.setLevel(state.Fadelevel)
                                    this.runIn(1, GuaranteeFade)
                                }
                                state.LightFading = false
                            }
                            if (value == 'held' && LightSwitch.currentState('switch').value == 'on') {
                                state.Fadelevel = null
                                if (state.debug) {
                                    this.debugLog('Light Off Button Held')
                                }
                                if (state.LightFading == false) {
                                    state.curLevel = LightSwitch.currentState('level').value.toInteger()
                                }
                                if (state.curLevel == null) {
                                    state.curLevel = 0
                                }
                                if (state.debug) {
                                    this.debugLog('Light Fade Down Button Pressed')
                                    this.debugLog("Light Level Before Fade Down: ${state.curLevel}")
                                }
                                state.LightFading = true
                                state.LightFadeIncrease = false
                                this.unschedule()
                                this.LightFade()
                            }
                        }
                        if (FanOnButton == buttonNumber ) {
                            if (state.debug) {
                                this.debugLog('Fan On Button Pressed')
                            }
                            if (value == 'pushed') {
                                if (FanSwitch.currentState('switch').value == 'off') {
                                    FanSwitch.on()
                                }
                            }
                            if (value == 'held') {
                                if (state.debug) {
                                    this.debugLog('Fan Speed Up Button Pressed')
                                    this.debugLog("Current Fan Level: ${FanSwitch.currentState(level).value}")
                                }
                                FanSwitch.setLevel(FanSwitch.currentState('level').value.toInteger() + 33)
                            }
                        }
                        if (FanOffButton == buttonNumber ) {
                            if (state.debug) {
                                this.debugLog('Fan Off Button Pressed')
                            }
                            if (value == 'pushed') {
                                if (FanSwitch.currentState('switch').value == 'on') {
                                    FanSwitch.off()
                                }
                            }
                            if (value == 'held') {
                                if (state.debug) {
                                    this.debugLog('Fan Speed Down Button Pressed')
                                    this.debugLog("Current Fan Level: ${FanSwitch.currentState(level).value}")
                                }
                                FanSwitch.setLevel(FanSwitch.currentState('level').value.toInteger() - 33)
                            }
                        }
                    } else {
                        if (state.debug) {
                            this.debugLog('Button Handler doing nothing, button press outside of schedule!')
                        }
                    }
                } else {
                    if (state.debug) {
                        this.debugLog('Button Handler doing nothing, rule is inactive!')
                    }
                }
                if (state.debug) {
                    this.debugLog('Button Handler Ended')
                }
            

	})

    .subscribedEventHandler('sunriseTimeHandler', (context, event) => {
        
                if (state.debug) {
                    this.debugLog('sunriseTime Handler Started')
                }
                state.sunsriseTime = location.currentValue('sunriseTime')
                if (state.debug) {
                    this.debugLog("sunriseTime set to: ${state.sunsriseTime}")
                }
                if (state.debug) {
                    this.debugLog('sunriseTime Handler Ended')
                }
            

	})
