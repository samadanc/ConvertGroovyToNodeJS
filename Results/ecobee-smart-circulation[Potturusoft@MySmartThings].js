
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'routineExecuted', 'modeOrProgramHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'mode', 'modeOrProgramHandler')

    })

    .subscribedEventHandler('modeOrProgramHandler', (context, event) => {
        
                if (settings.tempDisable == true) {
                    this.LOG('temporarily disabled as per request.', 2, null, 'warn')
                    return true
                }
                let isOK = true
                if (theModes || thePrograms || statModes ) {
                    isOK = theModes && theModes.contains(location.mode) ? true : thePrograms && thePrograms.contains(theThermostat.currentValue('currentProgram')) ? true : statModes && statModes.contains(theThermostat.currentValue('thermostatMode')) ? true : false
                }
                atomicState.isOK = isOK 
                if (evt && event.name == 'thermostatOperatingState' && !atomicState.fanSinceLastAdjustment) {
                    if (event.value != 'idle' && !(event.value.contains('ending'))) {
                        atomicState.fanSinceLastAdjustment = true
                    }
                }
                this.deltaHandler(evt)
            

	})

    .subscribedEventHandler('deltaHandler', (context, event) => {
        
                if (settings.tempDisable == true) {
                    this.LOG('temporarily disabled as per request.', 2, null, 'warn')
                    atomicState.amIRunning = false
                    return true
                }
                let isOK = atomicState.isOK
                if (isOK != null && isOK == false) {
                    if (atomicState.amIRunning) {
                        atomicState.amIRunning = false
                    }
                    return null
                }
                let currentProgram = theThermostat.currentValue('currentProgram')
                let vacationHold = currentProgram == 'Vacation'
                if (!vacationOverride && vacationHold ) {
                    this.LOG("$theThermostat is in Vacation mode, but not configured to override Vacation fanMinOnTime, returning", 3, '', 'warn')
                    atomicState.amIRunning = false
                    return null
                }
                if (evt) {
                    if (event.name == 'currentProgram') {
                        this.LOG("Thermostat Program changed to my Program (${event.value})", 3, null, 'info')
                    } else {
                        if (event.name == 'mode') {
                            this.LOG("Location Mode changed to my Mode (${event.value})", 3, null, 'info')
                        } else {
                            this.LOG("Called with ${event.device} ${event.name} ${event.value}", 3, null, 'trace')
                        }
                    }
                    if (settings.minFanOnTime == settings.maxFanOnTime) {
                        if (theThermostat.currentValue('fanMinOnTime').toInteger() == settings.minFanOnTime.toInteger()) {
                            this.LOG('Configured min==max==fanMinOnTime, nothing to do, skipping...', 2, null, 'info')
                            atomicState.amIRunning = false
                            return null
                        } else {
                            this.LOG("Configured min==max, setting fanMinOnTime(${settings.minFanOnTime})", 2, null, 'info')
                            theThermostat.setFanMinOnTime(settings.minFanOnTime)
                            atomicState.amIRunning = false
                            return null
                        }
                    }
                } else {
                    this.LOG('Called directly', 4, '', 'trace')
                }
                let howLong = atomicState.lastCheckTime ? this.now() - atomicState.lastCheckTime : 333333
                if (howLong > 300000) {
                    atomicState.amIRunning = false
                }
                if (atomicState.amIRunning) {
                    this.LOG("An instance of ${app.name} is already running ($howLong ms) , skipping...", 3, null, 'trace')
                    return null
                } else {
                    atomicState.amIRunning = true
                }
                atomicState.lastCheckTime = this.now()
                let temps = []
                Double total = 0.0
                let i = 0
                theSensors.each({ 
                    let temp = it.currentValue('temperature')
                    if (temp.isNumber() && temp > 0) {
                        temps += [ temp ]
                        total = total + temp.toDouble()
                        i = i + 1
                    }
                })
                Double avg = 0.0
                if (i > 1) {
                    avg = total / i.toDouble().round(2)
                    this.LOG("Current temperature readings: $temps, average is ${String.format(%.2f, avg)}°", 4, '', 'trace')
                } else {
                    this.LOG("Only recieved ${temps.size()} valid temperature readings, skipping...", 3, '', 'warn')
                    atomicState.amIRunning = false
                    return null
                }
                if (outdoorSensor) {
                    let outTemp = null
                    if (outdoorSensor.id == theThermostat.id) {
                        outTemp = theThermostat.currentValue('weatherTemperature')
                        this.LOG("Using ${theThermostat.displayName}'s weatherTemperature ($outTemp°)", 4, null, 'info')
                    } else {
                        outTemp = outdoorSensor.currentValue('temperature')
                        this.LOG("Using ${outdoorSensor.displayName}'s temperature ($outTemp°)", 4, null, 'info')
                    }
                    Double inoutDelta = null
                    if (outTemp.isNumber()) {
                        inoutDelta = outTemp.toDouble() - avg .round(2)
                    }
                    if (inoutDelta == null) {
                        this.LOG('Invalid outdoor temperature, skipping...', 1, '', 'warn')
                        atomicState.amIRunning = false
                        return null
                    }
                    this.LOG("Outside temperature is currently $outTemp°, inside temperature average is ${String.format(%.2f, avg)}°", 4, null, 'trace')
                    let inRange = false
                    if (adjRange.endsWith('warmer')) {
                        if (adjRange.startsWith('M')) {
                            if (inoutDelta > 10.0) {
                                inRange = true
                            }
                        } else {
                            if (adjRange.startsWith('5')) {
                                if (inoutDelta <= 10.0 && inoutDelta >= 5.0) {
                                    inRange = true
                                }
                            } else {
                                if (inoutDelta < 5.0 && inoutDelta >= 0.0) {
                                    inRange = true
                                }
                            }
                        }
                    } else {
                        if (adjRange.startsWith('M')) {
                            if (inoutDelta < -10.0) {
                                inRange = true
                            }
                        } else {
                            if (adjRange.startsWith('-1')) {
                                if (inoutDelta <= -5.0 && inoutDelta >= -10.0) {
                                    inRange = true
                                }
                            } else {
                                if (inoutDelta > -5.0 && inoutDelta < 0.0) {
                                    inRange = true
                                }
                            }
                        }
                    }
                    if (!inRange) {
                        this.LOG("In/Out temperature delta ($inoutDelta°) not in range ($adjRange), skipping...", 4, '', 'trace')
                        atomicState.amIRunning = false
                        return null
                    } else {
                        this.LOG("In/Out temperature delta ($inoutDelta°) is in range ($adjRange), adjusting...", 4, '', 'trace')
                    }
                }
                Double min = temps.min().toDouble().round(2)
                Double max = temps.max().toDouble().round(2)
                Double delta = max - min .round(2)
                atomicState.maxMax = atomicState.maxMax.toDouble() > max ? atomicState.maxMax : max 
                atomicState.minMin = atomicState.minMin.toDouble() < min ? atomicState.minMin : min 
                atomicState.maxDelta = atomicState.maxDelta.toDouble() > delta ? atomicState.maxDelta : delta 
                atomicState.minDelta = atomicState.minDelta.toDouble() < delta ? atomicState.minDelta : delta 
                let statState = theThermostat.currentValue('thermostatOperatingState')
                if (statState != 'idle' && statState != 'fan only') {
                    this.LOG("$theThermostat is $statState, no adjustments made", 4, '', 'trace')
                    atomicState.amIRunning = false
                    return null
                }
                if (atomicState.lastAdjustmentTime) {
                    let timeNow = this.now()
                    let minutesLeft = fanAdjustMinutes - timeNow - atomicState.lastAdjustmentTime / 60000.toInteger()
                    if (minutesLeft > 0) {
                        this.LOG("Not time to adjust yet - $minutesLeft minutes left", 4, '', 'trace')
                        atomicState.amIRunning = false
                        return null
                    }
                }
                Integer currentOnTime = theThermostat.currentValue('fanMinOnTime') ? theThermostat.currentValue('fanMinOnTime').toInteger() : 0
                Integer newOnTime = currentOnTime 
                if (delta >= deltaTemp.toDouble()) {
                    newOnTime = currentOnTime + fanOnTimeDelta 
                    if (newOnTime > settings.maxFanOnTime) {
                        newOnTime = settings.maxFanOnTime
                    }
                    if (currentOnTime != newOnTime ) {
                        this.LOG("Temperature delta is ${String.format(%.2f, delta)}°/${String.format(%.2f, deltaTemp.toDouble())}°, increasing circulation time for $theThermostat to $newOnTime min/hr", 3, '', 'info')
                        if (vacationHold) {
                            theThermostat.setVacationFanMinOnTime(newOnTime)
                        } else {
                            this.LOG("deltaHandler: calling setFanMinOnTime($newOnTime)", 3, null, 'info')
                            theThermostat.setFanMinOnTime(newOnTime)
                        }
                        atomicState.fanSinceLastAdjustment = false
                        atomicState.lastAdjustmentTime = this.now()
                        atomicState.amIRunning = false
                        return null
                    }
                } else {
                    newOnTime = currentOnTime - fanOnTimeDelta 
                    if (newOnTime < settings.minFanOnTime) {
                        newOnTime = settings.minFanOnTime
                    }
                    if (currentOnTime != newOnTime ) {
                        this.LOG("Temperature delta is ${String.format(%.2f, delta)}°/${String.format(%.2f, deltaTemp.toDouble())}°, decreasing circulation time for $theThermostat to $newOnTime min/hr", 3, '', 'info')
                        if (vacationHold) {
                            theThermostat.setVacationFanMinOnTime(newOnTime)
                        } else {
                            this.LOG("deltaHandler: calling setFanMinOnTime($newOnTime)", 3, null, 'info')
                            theThermostat.setFanMinOnTime(newOnTime)
                        }
                        atomicState.fanSinceLastAdjustment = false
                        atomicState.lastAdjustmentTime = this.now()
                        atomicState.amIRunning = false
                        return null
                    }
                }
                this.LOG('No adjustment made', 4, '', 'trace')
                atomicState.amIRunning = false
            

	})
