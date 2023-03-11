
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('turnItOn', delay);

    })

    .subscribedEventHandler('onHandler', (context, event) => {
        
                log.trace("onHandler() ${event.device?.label} ${event.name}: ${event.value}")
                this.turnItOn()
            

	})

    .subscribedEventHandler('tempHandler', (context, event) => {
        
                log.trace("tempHandler() ${event.device?.label} ${event.name}: ${event.value}")
                if (targetOff) {
                    if (event.integerValue >= targetTemperature ) {
                        this.turnItOff()
                    }
                }
                if (targetOn) {
                    if (event.integerValue < targetTemperature ) {
                        this.turnItOn()
                    }
                }
            

	})

    .subscribedEventHandler('powerHandler', (context, event) => {
        
                log.trace("powerHandler() ${event.device?.label} ${event.name}: ${event.value}")
                let newPower = 0.0
                if (event.value.isNumber()) {
                    try {
                        newPower = event.numberValue
                    } 
                    catch (let e) {
                        newPower = 0.0
                    } 
                }
                if (settings.minPower?.isNumber() && settings.minPower >= 0.0) {
                    if (newPower > settings.minPower) {
                        if (settings.maxPower?.isNumber() && settings.maxPower > 0.0) {
                            if (newPower <= settings.maxPower) {
                                if (debug) {
                                    log.trace("$minPower <= newPower <= $maxPower")
                                }
                                this.turnItOn()
                            } else {
                                if (debug) {
                                    log.trace("newPower > $maxPower, skipping...")
                                }
                            }
                        } else {
                            if (debug) {
                                log.trace("$minPower <= newPower")
                            }
                            this.turnItOn()
                        }
                    } else {
                        if (debug) {
                            log.trace("newPower < $minPower, skipping...")
                        }
                    }
                } else {
                    if (debug) {
                        log.trace('No power constraints')
                    }
                    this.turnItOn()
                }
            

	})

    .subscribedEventHandler('offHandler', (context, event) => {
        
                log.trace("offHandler() ${event.device?.label} ${event.name}: ${event.value}")
                this.turnItOff()
            

	})

    .scheduledEventHandler('turnItOn', (context, event) => {
        
                if (atomicState.keepOffNow) {
                    return null
                }
                let minSeconds = minTimeBetween?.isNumber() ? minTimeBetween.toInteger() * 60 : 60
                let turnOn = this.secondsPast(atomicState.lastOnTime, minSeconds)
                if (turnOn && timedOff ) {
                    turnOn = this.secondsPast(atomicState.lastOnTime, offAfterMinutes * 60)
                }
                if (turnOn && useTargetTemp ) {
                    if (targetThermometer.currentTemperature >= targetTemperature ) {
                        turnOn = false
                    }
                }
                if (turnOn) {
                    log.info('Turning on')
                    if (!recircMomentary) {
                        if (recircSwitch.currentSwitch != 'on') {
                            recircSwitch.on()
                        }
                    } else {
                        recircSwitch.on()
                    }
                    atomicState.lastOnTime = new Date().time
                    if (!recircMomentary) {
                        if (timedOff) {
                            this.runIn(offAfterMinutes * 60, 'turnItOff', ['overwrite': true])
                        } else {
                            this.runIn(2, 'turnItOff', ['overwrite': true])
                        }
                    }
                } else {
                    log.info('Skipping...')
                }
            

	})
