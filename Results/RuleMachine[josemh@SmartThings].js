
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('runRule', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'mode', 'allHandler')

    })

    .subscribedEventHandler('allHandler', (context, event) => {
        
                log.info("${app.label}: ${event.displayName} ${event.name} ${event.value}")
                this.runRule(false)
            

	})

    .subscribedEventHandler('disabledHandler', (context, event) => {
        
                state.disabled = event.value == 'on'
            

	})

    .scheduledEventHandler('runRule', (context, event) => {
        
                if (!allOk) {
                    return null
                }
                state.token = 0
                let success = this.eval()
                if (success != state.success || delay ) {
                    this.unschedule(delayRuleTrue)
                    this.unschedule(delayRuleFalse)
                    if (delayTrue > 0 && !delay && success ) {
                        this.doDelayTrue(delayTrue)
                    } else {
                        if (delayFalse > 0 && !delay && !success) {
                            this.doDelayFalse(delayFalse)
                        } else {
                            if (success) {
                                if (onSwitchTrue) {
                                    onSwitchTrue.on()
                                }
                                if (offSwitchTrue) {
                                    offSwitchTrue.off()
                                }
                                if (delayedOffTrue) {
                                    this.runIn(delayMinutesTrue * 60, delayOffTrue)
                                }
                                if (pendedOffTrue) {
                                    this.runIn(pendMinutesTrue * 60, pendingOffTrue)
                                }
                                if (pendedOffFalse) {
                                    this.unschedule(pendingOffFalse)
                                }
                                if (dimATrue) {
                                    dimATrue.setLevel(dimLATrue)
                                }
                                if (dimBTrue) {
                                    dimBTrue.setLevel(dimLBTrue)
                                }
                                if (bulbsTrue) {
                                    this.setColor(true)
                                }
                                if (lockTrue) {
                                    lockTrue.lock()
                                }
                                if (unlockTrue) {
                                    unlockTrue.unlock()
                                }
                                if (openValveTrue) {
                                    openValveTrue.open()
                                }
                                if (closeValveTrue) {
                                    closeValveTrue.close()
                                }
                                if (thermoTrue) {
                                    if (thermoModeTrue) {
                                        thermoTrue.setThermostatMode(thermoModeTrue)
                                    }
                                    if (thermoSetHeatTrue) {
                                        thermoTrue.setHeatingSetpoint(thermoSetHeatTrue)
                                    }
                                    if (thermoSetCoolTrue) {
                                        thermoTrue.setCoolingSetpoint(thermoSetCoolTrue)
                                    }
                                    if (thermoFanTrue) {
                                        thermoTrue.setThermostatFanMode(thermoFanTrue)
                                    }
                                }
                                if (modeTrue) {
                                    this.setLocationMode(modeTrue)
                                }
                                if (myPhraseTrue) {
                                    location.helloHome.execute(myPhraseTrue)
                                }
                                if (pushTrue) {
                                    this.sendPush(msgTrue ? msgTrue : "Rule ${app.label} True")
                                }
                                if (phoneTrue) {
                                    this.sendSms(phoneTrue, msgTrue ? msgTrue : "Rule ${app.label} True")
                                }
                            } else {
                                if (onSwitchFalse) {
                                    onSwitchFalse.on()
                                }
                                if (offSwitchFalse) {
                                    offSwitchFalse.off()
                                }
                                if (delayedOffFalse) {
                                    this.runIn(delayMinutesFalse * 60, delayOffFalse)
                                }
                                if (pendedOffFalse) {
                                    this.runIn(pendMinutesFalse * 60, pendingOffFalse)
                                }
                                if (pendedOffTrue) {
                                    this.unschedule(pendingOffTrue)
                                }
                                if (dimAFalse) {
                                    dimAFalse.setLevel(dimLAFalse)
                                }
                                if (dimBFalse) {
                                    dimBFalse.setLevel(dimLBFalse)
                                }
                                if (bulbsFalse) {
                                    this.setColor(false)
                                }
                                if (lockFalse) {
                                    lockFalse.lock()
                                }
                                if (unlockFalse) {
                                    unlockFalse.unlock()
                                }
                                if (openValveFalse) {
                                    openValveFalse.open()
                                }
                                if (closeValveFalse) {
                                    closeValveFalse.close()
                                }
                                if (thermoFalse) {
                                    if (thermoModeFalse) {
                                        thermoFalse.setThermostatMode(thermoModeFalse)
                                    }
                                    if (thermoSetHeatFalse) {
                                        thermoFalse.setHeatingSetpoint(thermoSetHeatFalse)
                                    }
                                    if (thermoSetCoolFalse) {
                                        thermoFalse.setCoolingSetpoint(thermoSetCoolFalse)
                                    }
                                    if (thermoFanFalse) {
                                        thermoFalse.setThermostatFanMode(thermoFanFalse)
                                    }
                                }
                                if (modeFalse) {
                                    this.setLocationMode(modeFalse)
                                }
                                if (myPhraseFalse) {
                                    location.helloHome.execute(myPhraseFalse)
                                }
                                if (pushFalse) {
                                    this.sendPush(msgFalse ? msgFalse : "Rule ${app.label} False")
                                }
                                if (phoneFalse) {
                                    this.sendSms(phoneFalse, msgFalse ? msgFalse : "Rule ${app.label} False")
                                }
                            }
                            state.success = success 
                            log.info(success ? "${app.label} is True" : "${app.label} is False")
                        }
                    }
                }
            

	})
