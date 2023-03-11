
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.runIn('timeHandler', delay);

        context.api.schedules.runIn('checkOperatingStates', delay);

    })

    .subscribedEventHandler('doorHandler', (context, event) => {
        
                console.log("doorHandler ${event.displayName} ${event.name}: ${event.value}")
                let before = atomicState.managingTemp
                this.checkDoor(event.value)
                if (before != atomicState.managingTemp) {
                    log.trace("doorHandler managingTemp changed: ${atomicState.managingTemp}, scheduling Check")
                    this.runIn(10, checkOperatingStates, ['overwrite': true])
                }
            

	})

    .subscribedEventHandler('tempHandler', (context, event) => {
        
                log.trace("tempHandler ${event.displayName} ${event.name}: ${event.value}")
                Integer pollFreq = state.fastPollSecs
                atomicState.timeHandlerLast = false
                if (pollTstats && this.secondsPast(state.lastPoll, pollFreq)) {
                    log.trace('tempHandler polling')
                    this.pollThermostats()
                    this.runIn(pollFreq, timeHandler, ['overwrite': true])
                }
                if (atomicState.managingTemp) {
                    if (event.displayName == thermometer.displayName && event.name == 'temperature') {
                        atomicState.lastStatus = 'temperature changed'
                        log.trace('Scheduling check (temp)')
                        this.runIn(2, checkOperatingStates, ['overwrite': true])
                    }
                } else {
                    if (humidControl) {
                        if (event.displayName == humidSensor.displayName && event.name == 'humidity') {
                            atomicState.lastStatus = 'humidity changed'
                            log.trace('Scheduling check (humid)')
                            this.runIn(2, checkOperatingStates, ['overwrite': true])
                        }
                    }
                }
            

	})

    .subscribedEventHandler('switchHandler', (context, event) => {
        
                log.trace("switchHandler ${event.displayName} ${event.name}: ${event.value}")
                atomicState.timeHandlerLast = true
                Integer seconds = state.minPollSecs
                if (seconds != 0) {
                    log.trace('Scheduling timeHander')
                    this.runIn(seconds, timeHandler, ['overwrite': true])
                } else {
                    log.trace('calling timeHander')
                    this.timeHandler()
                }
            

	})

    .subscribedEventHandler('tHandler', (context, event) => {
        
                log.trace("tHandler ${event.displayName} ${event.name}: ${event.value}")
                if (atomicState.managingTemp) {
                    if (event.displayName == followMe.displayName) {
                        let inRecovery = atomicState.recoveryMode
                        log.trace("tHandler followMe: inRecovery: $inRecovery")
                        if (event.name == 'thermostatOperatingState') {
                            if (event.value == 'idle') {
                                if (inRecovery) {
                                    log.info('Recovery finished - idle')
                                    atomicState.recoveryMode == false
                                }
                            } else {
                                if (event.value == 'fan only') {
                                    if (inRecovery) {
                                        log.info('Recovery finished - fan only')
                                        atomicState.recoveryMode = false
                                    }
                                } else {
                                    if (event.value == 'heating') {
                                        if (followMe.currentTemperature > followMe.currentHeatingSetpoint.toFloat()) {
                                            if (!inRecovery) {
                                                log.info('Recovery started - heating')
                                                atomicState.recoveryMode = true
                                            }
                                        }
                                    } else {
                                        if (event.value == 'cooling') {
                                            if (followMe.currentTemperature < followMe.currentCoolingSetpoint.toFloat()) {
                                                if (!inRecovery) {
                                                    log.info('Recovery started - cooling')
                                                    atomicState.recoveryMode = true
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        } else {
                            if (event.name == 'heatingSetpoint') {
                                atomicState.lastStatus = 'heatingSetpoint changed'
                                if (followMe.currentProgramType != 'hold') {
                                    if (followMe.currentThermostatMode.contains('eat')) {
                                        if (event.value.toFloat() > atomicState.highHeat) {
                                            atomicState.highHeat = event.value.toFloat()
                                        }
                                    }
                                }
                                if (followMe.currentThermostatOperatingState == 'heating') {
                                    if (inRecovery) {
                                        if (event.value.toFloat() >= followMe.currentTemperature) {
                                            log.info('Recovery finished - heating')
                                            atomicState.recoveryMode = false
                                        }
                                    }
                                }
                            } else {
                                if (event.name == 'coolingSetpoint') {
                                    atomicState.lastStatus = 'coolingSetpoint changed'
                                    if (followMe.currentProgramType != 'hold') {
                                        if (followMe.currentThermostatMode.contains('cool')) {
                                            if (event.value.toFloat() < atomicState.lowCool) {
                                                atomicState.lowCool = event.value.toFloat()
                                            }
                                        }
                                    }
                                    if (followMe.currentThermostatOperatingState == 'cooling') {
                                        if (inRecovery) {
                                            if (event.value.toFloat() <= followMe.currentTemperature) {
                                                log.info('Recovery finished - cooling')
                                                atomicState.recoveryMode = false
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                log.trace('Scheduling check')
                this.runIn(2, checkOperatingStates, ['overwrite': true])
            

	})

    .scheduledEventHandler('timeHandler', (context, event) => {
        
                log.trace('timeHandler polling')
                if (atomicState.timeHandlerLast) {
                    if (atomicState.checking) {
                        console.log('Checking lockout - resetting!')
                        atomicState.checking = false
                    }
                    atomicState.timeHandlerLast = false
                } else {
                    if (atomicState.checking) {
                        atomicState.timeHandlerLast = true
                    }
                }
                if (pollTstats) {
                    this.pollThermostats()
                    Integer delayPoll = state.slowPollSecs
                    if (thermostatOne.currentThermostatOperatingState == 'idle') {
                        if (thermostatTwo) {
                            if (thermostatTwo.currentThermostatOperatingState == 'idle') {
                                delayPoll = delayPoll * 2
                            }
                        } else {
                            delayPoll = delayPoll * 2
                        }
                    }
                    if (pollSwitch) {
                        if (pollSwitch.currentSwitch != 'on') {
                            return null
                        } else {
                            delayPoll = state.slowPollSecs
                        }
                    }
                    this.runIn(delayPoll, timeHandler, ['overwrite': true])
                }
            

	})

    .scheduledEventHandler('checkOperatingStates', (context, event) => {
        
                if (atomicState.checking) {
                    log.trace('Already checking')
                    return null
                }
                atomicState.checking = true
                log.trace('Checking started')
                let inRecovery = atomicState.recoveryMode
                let priorStatus = atomicState.lastStatus
                let manageTemp = atomicState.managingTemp
                let activeNow = 0
                let stateNow = 'idle'
                let opStateOne = thermostatOne.currentThermostatOperatingState
                if (opStateOne != 'idle') {
                    activeNow = activeNow + 1
                    stateNow = opStateOne 
                }
                let opStateTwo = 'idle'
                if (thermostatTwo) {
                    opStateTwo = thermostatTwo.currentThermostatOperatingState
                }
                if (opStateTwo != 'idle') {
                    activeNow = activeNow + 1
                    stateNow = opStateTwo 
                }
                if (activeNow == 2) {
                    if (opStateOne != opStateTwo ) {
                        if (opStateTwo == 'fan only') {
                            stateNow = opStateOne 
                            activeNow = 1
                        } else {
                            if (opStateOne != 'fan only') {
                                stateNow = priorStatus[(0..6)]
                                activeNow = 1
                                if (stateNow != 'heating' && stateNow != 'cooling') {
                                    stateNow = 'cooling'
                                    activeNow = 1
                                }
                                log.info("Heating/Cooling Conflict - assumed $stateNow!")
                            } else {
                            }
                        }
                    }
                }
                log.info("stateNow: $opStateOne $opStateTwo $stateNow, activeNow: $activeNow inRecovery: $inRecovery manageTemp: $manageTemp")
                let currentStatus = "$stateNow $activeNow $inRecovery $manageTemp"
                if (currentStatus == priorStatus ) {
                    log.trace('Nothing changed!')
                } else {
                    atomicState.lastStatus = currentStatus 
                    if (atomicState.ventChanged) {
                        if (pollVent) {
                            ventSwitch.poll()
                        }
                        atomicState.ventChanged = false
                    }
                    log.info("${ventSwitch.displayName} is ${ventSwitch.currentLevel}%, ${thermometer.displayName} temperature is ${thermometer.currentTemperature}")
                    if (activeNow == 0) {
                        atomicState.recoveryMode = false
                        if (thermostatTwo) {
                            if (!pollTstats || pollStats && !pollSwitch) {
                                if (ventSwitch.currentLevel != 99) {
                                    ventSwitch.setLevel(99)
                                    atomicState.ventChanged = true
                                }
                            }
                        }
                        Integer seconds = state.slowPollSecs
                        if (pollTstats) {
                            if (pollSwitch) {
                                if (pollSwitch.currentSwitch != 'off') {
                                    pollSwitch.off()
                                }
                                seconds = state.slowPollSecs
                            }
                            this.runIn(seconds, timeHandler, ['overwrite': true])
                        }
                    } else {
                        if (activeNow == 1) {
                            if (pollTstats) {
                                if (pollSwitch) {
                                    if (pollSwitch.currentSwitch != 'on') {
                                        pollSwitch.on()
                                    }
                                }
                            }
                            if (stateNow == 'cooling') {
                                let coolLevel = 0
                                if (thermostatTwo) {
                                    coolLevel = 99
                                } else {
                                    if (manageTemp || humidControl ) {
                                        coolLevel = minVent 
                                        Float coolSP = followMe.currentCoolingSetpoint.toFloat()
                                        log.info("target: $coolSP")
                                        if (coolSP < atomicState.lowCool) {
                                            atomicState.lowCool = coolSP 
                                        }
                                        if (inRecovery) {
                                            if (thermometer.currentTemperature.toFloat() > atomicState.lowCool) {
                                                coolLevel = 99
                                            }
                                        } else {
                                            if (thermometer.currentTemperature.toFloat() > coolSP ) {
                                                coolLevel = 99
                                            } else {
                                                if (humidControl) {
                                                    let humidity = humidSensor.currentHumidity
                                                    if (humidity) {
                                                        if (humidity > targetHumidity ) {
                                                            if (thermometer.currentTemperature.toFloat() > coolSP - maxOverCool ) {
                                                                log.info("Overriding temperature to reduce humidity ($humidity)")
                                                                coolLevel = 99
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                if (ventSwitch.currentLevel != coolLevel ) {
                                    log.info("Cooling, $coolLevel% vent")
                                    ventSwitch.setLevel((coolLevel as Integer))
                                    atomicState.ventChanged = true
                                }
                            } else {
                                if (stateNow == 'heating') {
                                    let heatLevel = 0
                                    if (manageTemp) {
                                        heatLevel = minVent 
                                        Float heatSP = followMe.currentHeatingSetpoint.toFloat()
                                        Float hiHeat = atomicState.highHeat
                                        log.info("target: $heatSP, $hiHeat")
                                        if (heatSP > hiHeat ) {
                                            hiHeat = heatSP 
                                        }
                                        if (inRecovery) {
                                            if (thermometer.currentTemperature.toFloat() < hiHeat ) {
                                                heatLevel = 99
                                            }
                                        } else {
                                            if (thermometer.currentTemperature.toFloat() < heatSP ) {
                                                heatLevel = 99
                                            }
                                        }
                                        if (atomicState.highHeat != hiHeat ) {
                                            atomicState.highHeat = hiHeat 
                                        }
                                    }
                                    if (ventSwitch.currentLevel != heatLevel ) {
                                        log.info("Heating, $heatLevel% vent")
                                        ventSwitch.setLevel((heatLevel as Integer))
                                        atomicState.ventChanged = true
                                    }
                                } else {
                                    if (stateNow == 'fan only') {
                                        let fanLevel = minVent 
                                        if (thermostatTwo) {
                                            fanLevel = 99
                                        }
                                        if (manageTemp) {
                                            let priorState = priorStatus[(0..6)]
                                            if (priorState == 'cooling') {
                                                if (thermometer.currentTemperature.toFloat() > followMe.currentCoolingSetpoint.toFloat()) {
                                                    fanLevel = 99
                                                }
                                            } else {
                                                if (priorState == 'heating') {
                                                    if (thermometer.currentTemperature.toFloat() < followMe.currentHeatingSetpoint.toFloat()) {
                                                        fanLevel = 99
                                                    }
                                                }
                                            }
                                        }
                                        if (ventSwitch.currentLevel != fanLevel ) {
                                            log.info("Fan Only, $fanLevel% vent")
                                            ventSwitch.setLevel((fanLevel as Integer))
                                            atomicState.ventChanged = true
                                        }
                                    }
                                }
                            }
                        } else {
                            if (activeNow == 2) {
                                if (pollTstats) {
                                    if (pollSwitch) {
                                        if (pollSwitch.currentSwitch != 'on') {
                                            pollSwitch.on()
                                        }
                                    }
                                }
                                if (stateNow == 'cooling') {
                                    let coolLevel = minVent 
                                    if (manageTemp) {
                                        log.info("target: ${followMe.currentCoolingSetpoint.toFloat()}")
                                        if (inRecovery) {
                                            if (thermometer.currentTemperature.toFloat() > atomicState.lowCool) {
                                                coolLevel = 99
                                            }
                                        } else {
                                            if (thermometer.currentTemperature.toFloat() > followMe.currentCoolingSetpoint.toFloat()) {
                                                coolLevel = 99
                                            }
                                        }
                                    }
                                    if (humidControl && coolLevel != 99) {
                                        let humidity = humidSensor.currentHumidity
                                        if (humidity) {
                                            if (humidity > targetHumidity ) {
                                                if (thermometer.currentTemperature.toFloat() > coolSP - maxOverCool ) {
                                                    log.info("Overriding temperature to reduce humidity ($humidity)")
                                                    coolLevel = 33
                                                }
                                            }
                                        }
                                    }
                                    if (ventSwitch.currentLevel != coolLevel ) {
                                        log.info("Dual cooling, $coolLevel% vent")
                                        ventSwitch.setLevel((coolLevel as Integer))
                                        atomicState.ventChanged = true
                                    }
                                } else {
                                    if (stateNow == 'heating') {
                                        let heatLevel = minVent 
                                        if (manageTemp) {
                                            log.info("target: ${followMe.currentHeatingSetpoint.toFloat()}")
                                            if (inRecovery) {
                                                if (thermometer.currentTemperature.toFloat() < atomicState.highHeat) {
                                                    heatLevel = 99
                                                }
                                            } else {
                                                if (thermometer.currentTemperature.toFloat() < followMe.currentHeatingSetpoint.toFloat()) {
                                                    heatLevel = 99
                                                }
                                            }
                                        }
                                        if (ventSwitch.currentLevel != heatLevel ) {
                                            log.info("Dual heating, $heatLevel% vent")
                                            ventSwitch.setLevel((heatLevel as Integer))
                                            atomicState.ventChanged = true
                                        }
                                    } else {
                                        if (stateNow == 'fan only') {
                                            let fanLevel = minVent 
                                            if (manageTemp) {
                                                fanLevel = 33
                                            }
                                            if (ventSwitch.currentLevel != fanLevel ) {
                                                log.info("Dual fan only, $fanLevel% vent")
                                                ventSwitch.setLevel((fanLevel as Integer))
                                                atomicState.ventChanged = true
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                atomicState.checking = false
                log.trace('Checking finished')
            

	})
