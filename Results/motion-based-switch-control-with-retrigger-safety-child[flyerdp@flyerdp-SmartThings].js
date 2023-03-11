
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

    .subscribedEventHandler('MotionActiveHandler', (context, event) => {
        
                if (state.debug) {
                    this.debugLog('Motion Active Handler Triggered')
                    this.debugLog("Motion Sensor: ${event.displayName} is Active")
                }
                if (!state.ruleDisabled) {
                    this.unschedule()
                    ControlSwitches.each({ let individualSwitch ->
                        if (individualSwitch.currentState('switch').value == 'off') {
                            if (!state.RetriggerSafety || this.rearmCheck(state.RetriggerSafety) && this.scheduleAllowed()) {
                                if (state.debug) {
                                    this.debugLog("Control Switch ${individualSwitch.displayName} is: ${individualSwitch.currentState(switch).value}, switching on.")
                                }
                                individualSwitch.on()
                                state.AutoOn = true
                                state.ReTriggerSafety = null
                            } else {
                                if (state.debug) {
                                    this.debugLog('Motion Active Handler Triggered doing nothing, criteria not met')
                                }
                            }
                        }
                    })
                } else {
                    if (state.debug) {
                        this.debugLog('Motion Active Handler doing nothing, rule is inactive!')
                    }
                }
                if (state.debug) {
                    this.debugLog('Motion Active Handler Ended')
                }
            

	})

    .subscribedEventHandler('sunsetTimeHandler', (context, event) => {
        
                if (state.debug) {
                    this.debugLog('sunsetTime Handler Started')
                }
                state.sunsetTime = location.currentValue('sunsetTime')
                if (state.debug) {
                    this.debugLog("sunsetTime set to: ${state.sunsetTime}")
                    this.debugLog('sunsetTime Handler Ended')
                }
            

	})

    .subscribedEventHandler('sunriseTimeHandler', (context, event) => {
        
                state.sunsriseTime = location.currentValue('sunriseTime')
                if (state.debug) {
                    this.debugLog("sunriseTime set to: ${state.sunsriseTime}")
                    this.debugLog('sunriseTime Handler Ended')
                }
            

	})

    .subscribedEventHandler('MotionInactiveHandler', (context, event) => {
        
                if (state.debug) {
                    this.debugLog('Motion Inactive Handler Triggered')
                    this.debugLog("Motion Sensor: ${event.displayName} is InActive")
                }
                if (!state.ruleDisabled) {
                    let anySwitchesOn = null
                    ControlSwitches.each({ let individualSwitch ->
                        if (individualSwitch.currentState('switch').value == 'on') {
                            anySwitchesOn = true
                        }
                    })
                    if (!anySwitchesOn) {
                        if (state.debug) {
                            this.debugLog('No Switches are on, doing nothing')
                        }
                    }
                    if (allMotionInactive && state.AutoOn && anySwitchesOn || allMotionInactive && state.AutoOffCondition && anySwitchesOn && state.AutoOffMinutes) {
                        if (state.AutoOffCondition == 1 || state.AutoOffCondition == 2 || state.AutoOffCondition == 3 || state.AutoOffCondition == 5 && this.scheduleAllowed()) {
                            if (state.debug) {
                                this.debugLog("Auto Off Condition met, all Motion InActive going to wait for timeout of ${state.AutoOffMinutes} minutes")
                            }
                            this.runIn(state.AutoOffMinutes * 60, NoMotionTurnAllOff)
                        }
                    }
                } else {
                    if (state.debug) {
                        this.debugLog('Motion Inactive Handler doing nothing, rule is inactive!')
                    }
                }
                if (state.debug) {
                    this.debugLog('Motion Inactive Handler Ended')
                }
            

	})

    .subscribedEventHandler('SwitchHandler', (context, event) => {
        
                if (state.debug) {
                    this.debugLog('Switch Handler Triggered')
                }
                if (!state.ruleDisabled) {
                    switch (event.value) {
                        case 'on':
                            if (event.isPhysical()) {
                                if (state.debug) {
                                    this.debugLog("Switch: ${event.displayName} turned on Manually")
                                }
                                state.AutoOn = false
                                state.RetriggerSafety = null
                                if (state.AutoOffCondition == 2 || state.AutoOffCondition > 3 && this.scheduleAllowed()) {
                                    if (state.debug) {
                                        this.debugLog("Auto Off Condition met, Scheduling Off Timer going to wait for timeout of ${state.AutoOffMinutes} minutes")
                                    }
                                    this.runIn(state.AutoOffMinutes * 60, NoMotionTurnAllOff)
                                }
                            } else {
                                if (state.debug) {
                                    this.debugLog("Switch: ${event.displayName} turned on Automatically")
                                }
                                if (state.AutoOffCondition == 2 && state.AutoOn || state.AutoOffCondition == 3 || state.AutoOffCondition == 5 && this.scheduleAllowed()) {
                                    if (state.debug) {
                                        this.debugLog("Auto Off Condition met, Scheduling Off Timer going to wait for timeout of ${state.AutoOffMinutes} minutes")
                                    }
                                    this.runIn(state.AutoOffMinutes * 60, NoMotionTurnAllOff)
                                }
                            }
                            break
                        case 'off':
                            if (event.isPhysical()) {
                                if (state.debug) {
                                    this.debugLog("Switch: ${event.displayName} turned off Manually")
                                }
                                state.RetriggerSafety = this.now()
                                state.AutoOn = false
                                this.unschedule()
                            } else {
                                if (state.debug) {
                                    this.debugLog("Switch: ${event.displayName} turned off Automatically")
                                }
                                state.AutoOn = false
                                if (state.RetriggerSafetyAppliesTo == 'auto') {
                                    if (state.debug) {
                                        this.debugLog('ReArm Trigger Enabled because applies to is set to auto')
                                    }
                                    state.RetriggerSafety = this.now()
                                } else {
                                    if (state.debug) {
                                        this.debugLog('ReArm Trigger Not enabled because applies to is NOT set to auto')
                                    }
                                    state.RetriggerSafety = null
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
