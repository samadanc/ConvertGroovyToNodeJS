
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'mode', 'modeOrProgramHandler')

    })

    .subscribedEventHandler('deltaHandler', (context, event) => {
        
                let version = this.getVersionLabel()
                if (atomicState.versionLabel != version ) {
                    this.LOG("Code updated: $version", 1, null, 'debug')
                    atomicState.versionLabel = version 
                    this.runIn(2, updated, ['overwrite': true])
                    return null
                }
                if (settings.tempDisable == true) {
                    this.LOG('deltaHandler() - Temporarily disabled', 2, null, 'warn')
                    this.clearReservations()
                    return true
                }
                if (!atomicState.isOK) {
                    return null
                }
                String currentProgramName = ST ? theThermostat.currentValue('currentProgramName') : theThermostat.currentValue('currentProgramName', true)
                java.lang.Boolean vacationHold = currentProgramName && currentProgramName == 'Vacation'
                if (vacationHold && !settings.vacationOverride) {
                    this.LOG("deltaHandler() - $theThermostat is in Vacation mode, but not configured to override Vacation fanMinOnTime, returning", 3, '', 'warn')
                    return null
                }
                let tid = this.getDeviceId(theThermostat.deviceNetworkId)
                Integer fanMinOnTime = ((ST ? theThermostat.currentValue('fanMinOnTime') : theThermostat.currentValue('fanMinOnTime', true)) as Integer)
                if (!vacationHold) {
                    if (fanMinOnTime == 0 && this.anyReservations(tid, 'circOff')) {
                        if (!(this.haveReservation(tid, 'circOff'))) {
                            this.LOG('Can\'t get reservation to \'circOff\', exiting', 1, null, 'warn')
                            return null
                        }
                    }
                } else {
                    if (fanMinOnTime == 0 && this.anyReservations(tid, 'vacaCircOff')) {
                        if (!(this.haveReservation(tid, 'vacaCircOff'))) {
                            this.LOG('Can\'t get reservation to \'vacaCircOff\', exiting', 1, null, 'warn')
                            return null
                        }
                    }
                }
                if (evt) {
                    if (event.name == 'currentProgram') {
                        this.LOG("Thermostat Program changed to an enabled Program (${event.value})", 3, null, 'info')
                    } else {
                        if (event.name == 'mode') {
                            this.LOG("Location Mode changed to an enabled Mode (${event.value})", 3, null, 'info')
                        } else {
                            this.LOG("${event.device} ${event.name} ${event.value}", 3, null, 'debug')
                        }
                    }
                    if (settings.minFanOnTime.toInteger() == settings.maxFanOnTime.toInteger()) {
                        if (fanMinOnTime == settings.minFanOnTime.toInteger()) {
                            this.LOG('Configured min==max==fanMinOnTime, nothing to do, skipping...', 2, null, 'info')
                            return null
                        } else {
                            this.LOG("Configured min==max, setting fanMinOnTime(${settings.minFanOnTime})", 2, null, 'info')
                            if (vacationHold && settings.vacationOverride) {
                                this.cancelReservation(tid, 'vacaCircOff')
                                theThermostat.setVacationFanMinOnTime(settings.minFanOnTime.toInteger())
                            } else {
                                if (!vacationHold) {
                                    this.cancelReservation(tid, 'circOff')
                                    theThermostat.setFanMinOnTime(settings.minFanOnTime.toInteger())
                                }
                            }
                            atomicState.circMinutes = settings.minFanOnTime.toInteger()
                            this.updateMyLabel()
                            return null
                        }
                    } else {
                        if (fanMinOnTime > settings.maxFanOnTime.toInteger()) {
                            this.LOG("Current > max, setting fanMinOnTime(${settings.maxFanOnTime})", 2, null, 'info')
                            if (vacationHold && settings.vacationOverride) {
                                this.cancelReservation(tid, 'vacaCircOff')
                                theThermostat.setVacationFanMinOnTime(settings.maxFanOnTime.toInteger())
                            } else {
                                if (!vacationHold) {
                                    this.cancelReservation(tid, 'circOff')
                                    theThermostat.setFanMinOnTime(settings.maxFanOnTime.toInteger())
                                }
                            }
                            atomicState.circMinutes = settings.maxFanOnTime.toInteger()
                            this.updateMyLabel()
                        } else {
                            if (fanMinOnTime < settings.minFanOnTime.toInteger()) {
                                this.LOG("Current < min, setting fanMinOnTime(${settings.minFanOnTime})", 2, null, 'info')
                                if (vacationHold && settings.vacationOverride) {
                                    this.cancelReservation(tid, 'vacaCircOff')
                                    theThermostat.setVacationFanMinOnTime(settings.minFanOnTime.toInteger())
                                } else {
                                    if (!vacationHold) {
                                        this.cancelReservation(tid, 'circOff')
                                        theThermostat.setFanMinOnTime(settings.minFanOnTime.toInteger())
                                    }
                                }
                                atomicState.circMinutes = settings.minFanOnTime.toInteger()
                                this.updateMyLabel()
                            }
                        }
                    }
                } else {
                    this.LOG('deltaHandler() - called directly', 4, null, 'debug')
                }
                this.LOG('deltaHandler() - scheduling calcTemps() in 5 seconds', 3, null, 'debug')
                this.runIn(5, 'calcTemps', ['overwrite': true])
            

	})

    .subscribedEventHandler('quietOffHandler', (context, event) => {
        
                this.LOG("Quiet Time switch ${event.device.displayName} turned ${event.value}", 3, null, 'info')
                if (atomicState.quietNow) {
                    if (!(settings.quietSwitches.currentSwitch.contains(settings.qtOn))) {
                        atomicState.quietNow = false
                        this.LOG("Quiet Time disabled, ${app.name} will resume circulation time updates", 3, null, 'info')
                        this.modeOrProgramHandler(null)
                    } else {
                        let qtOff = settings.qtOn == 'on' ? 'off' : 'on'
                        this.LOG("All Quiet Time switches are not $qtOff, Quiet Time continues", 3, null, 'info')
                    }
                } else {
                    this.LOG("Weird, ${app.name} is not in Quiet Time", 1, null, 'warn')
                }
            

	})

    .subscribedEventHandler('quietOnHandler', (context, event) => {
        
                this.LOG("Quiet Time switch ${event.device.displayName} turned ${event.value}", 3, null, 'info')
                if (!atomicState.quietNow) {
                    atomicState.quietNow = true
                    Integer fanOnTime = ((ST ? theThermostat.currentValue('fanMinOnTime') : theThermostat.currentValue('fanMinOnTime', true)) as Integer)
                    Integer currentOnTime = fanOnTime ? fanOnTime : 0
                    atomicState.quietOnTime = currentOnTime 
                    atomicState.circMinutes = 'quiet time'
                    this.clearReservations()
                    this.LOG("Quiet Time enabled, ${app.name} will stop updating circulation time", 3, null, 'info')
                } else {
                    this.LOG('Quiet Time already enabled', 3, null, 'info')
                }
            

	})

    .subscribedEventHandler('modeOrProgramHandler', (context, event) => {
        
                if (settings.tempDisable == true) {
                    this.LOG("${app.name} temporarily disabled as per request.", 2, null, 'warn')
                    this.clearReservations()
                    return true
                }
                let version = this.getVersionLabel()
                if (atomicState.versionLabel != version ) {
                    this.LOG("Code updated: $version", 1, null, 'debug')
                    atomicState.versionLabel = version 
                    this.runIn(2, updated, ['overwrite': true])
                    return null
                }
                java.lang.Boolean isOK = true
                if (theModes || thePrograms || statModes ) {
                    String currentProgram = ST ? theThermostat.currentValue('currentProgram') : theThermostat.currentValue('currentProgram', true)
                    String thermostatMode = ST ? theThermostat.currentValue('thermostatMode') : theThermostat.currentValue('thermostatMode', true)
                    if (settings.needAll) {
                        isOK = settings.theModes ? settings.theModes.contains(location.mode) : true
                        if (isOK) {
                            isOK = settings.thePrograms ? settings.thePrograms.contains(currentProgram) : true
                        }
                        if (isOK) {
                            isOK = settings.statModes ? settings.statModes.contains(thermostatMode) : true
                        }
                    } else {
                        isOK = theModes && theModes.contains(location.mode)
                        if (!isOK) {
                            isOK = thePrograms && thePrograms.contains(currentProgram)
                        }
                        if (!isOK) {
                            isOK = statModes && statModes.contains(thermostatMode)
                        }
                    }
                    if (!isOK) {
                        this.LOG("Not in specified Modes ${(settings.needAll) ? and : or} Programs, not adjusting", 3, null, 'info')
                        this.clearReservations()
                    }
                }
                if (isOK && settings.theHumidistat) {
                    let currentHumidity = ST ? settings.theHumidistat.currentValue('humidity') : settings.theHumidistat.currentValue('humidity', true)
                    if ((currentHumidity as Integer) <= settings.highHumidity) {
                        isOK == false
                        this.LOG("Relative Humidity at ${settings.theHumidistat.displayName} is only $ncCh% (${settings.highHumidity}% set), not adjusting", 3, null, 'info')
                    } else {
                        this.LOG("Relative Humidity at ${settings.theHumidistat.displayName} is $ncCh% (${settings.highHumidity}% set), adjusting enabled", 3, null, 'info')
                    }
                }
                if (isOK) {
                    isOK = settings.quietSwitches ? atomicState.quietNow != true : true
                    if (!isOK) {
                        this.LOG('Quiet time active, not adjusting', 3, null, 'info')
                    }
                }
                atomicState.isOK = isOK 
                if (evt && event.name == 'thermostatOperatingState' && !atomicState.fanSinceLastAdjustment) {
                    if (event.value != 'idle' && !(event.value.contains('ending'))) {
                        atomicState.fanSinceLastAdjustment = true
                    }
                }
                this.deltaHandler(evt)
            

	})
