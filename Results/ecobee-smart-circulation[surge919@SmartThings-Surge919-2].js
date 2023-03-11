
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
        
                let isOK = true
                if (theModes || thePrograms ) {
                    isOK = theModes && theModes.contains(location.mode) ? true : thePrograms && thePrograms.contains(theThermostat.currentValue('currentProgram')) ? true : false
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
        
                let isOK = atomicState.isOK
                if (isOK != null && isOK == false) {
                    if (atomicState.amIRunning) {
                        atomicState.amIRunning = false
                    }
                    return null
                }
                let vacationHold = theThermostat.currentValue('currentProgramName') == 'Vacation'
                if (!vacationOverride && vacationHold ) {
                    this.LOG("$theThermostat is in Vacation mode, but not configured to override Vacation fanMinOnTime, returning", 4, '', 'warn')
                    atomicState.amIRunning = false
                    return null
                }
                if (evt) {
                    this.LOG("deltaHandler() entered with event ${event.name}: ${event.value}", 4, '', 'trace')
                } else {
                    this.LOG('deltaHandler() called directly', 4, '', 'trace')
                }
                if (atomicState.lastCheckTime && this.now() - atomicState.lastCheckTime > 3600000) {
                    atomicState.amIRunning = false
                }
                if (atomicState.amIRunning) {
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
                Double avg = total / i.toDouble()
                this.LOG("Current temperature readings: $temps, average is ${String.format(%.3f, avg)}", 4, '', 'trace')
                if (temps.size() < 2) {
                    this.LOG("Only recieved ${temps.size()} valid temperature readings, skipping...", 3, '', 'warn')
                    atomicState.amIRunning = false
                    return null
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
                Integer currentOnTime = theThermostat.currentValue('fanMinOnTime').toInteger()
                Integer newOnTime = currentOnTime 
                if (delta >= deltaTemp.toDouble()) {
                    newOnTime = currentOnTime + fanOnTimeDelta 
                    if (newOnTime > maxFanOnTime ) {
                        newOnTime = maxFanOnTime 
                    }
                    if (currentOnTime != newOnTime ) {
                        this.LOG("Temperature delta is ${String.format(%.2f, delta)}/$deltaTemp, increasing circulation time for $theThermostat to $newOnTime min/hr", 2, '', 'info')
                        if (vacationHold) {
                            theThermostat.setVacationFanMinOnTime(newOnTime)
                        } else {
                            theThermostat.setFanMinOnTime(newOnTime)
                        }
                        atomicState.fanSinceLastAdjustment = false
                        atomicState.lastAdjustmentTime = this.now()
                        atomicState.amIRunning = false
                        return null
                    }
                } else {
                    Double target = this.getTemperatureScale() == 'C' ? 0.55 : 1.0
                    if (target > deltaTemp.toDouble()) {
                        target = deltaTemp.toDouble() * 0.66667.round(2)
                    }
                    if (delta <= target ) {
                        newOnTime = currentOnTime - fanOnTimeDelta 
                        if (newOnTime < minFanOnTime ) {
                            newOnTime = minFanOnTime 
                        }
                        if (currentOnTime != newOnTime ) {
                            this.LOG("Temperature delta is ${String.format(%.2f, delta)}/${String.format(%.2f, target)}, decreasing circulation time for $theThermostat to $newOnTime min/hr", 2, '', 'info')
                            if (vacationHold) {
                                theThermostat.setVacationFanMinOnTime(newOnTime)
                            } else {
                                theThermostat.setFanMinOnTime(newOnTime)
                            }
                            atomicState.fanSinceLastAdjustment = false
                            atomicState.lastAdjustmentTime = this.now()
                            atomicState.amIRunning = false
                            return null
                        }
                    }
                }
                this.LOG('No adjustment made', 4, '', 'trace')
                atomicState.amIRunning = false
            

	})
