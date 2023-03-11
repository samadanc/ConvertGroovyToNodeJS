
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('eventHandler', (context, event) => {
        
                log.trace("eventHandler: ${event.name}: ${event.value}")
                state.eventStopTime = null
                if (modeOk && daysOk && timeOk && darkOk && moodOk ) {
                    log.info('All checks OK, switching on now')
                    this.activateHue()
                }
            

	})

    .subscribedEventHandler('illuminanceHandler', (context, event) => {
        
                if (modeOk && daysOk && timeOk && moodOk ) {
                    if (state.lastStatus != 'off' && event.integerValue > lightOffValue ? lightOffValue : 150) {
                        log.info('Light was not off and brightness was too high')
                        this.deactivateHue()
                    } else {
                        if (state.eventStopTime) {
                            if (state.lastStatus != 'off' && switchOff ) {
                                log.info('Light was not off and not currently activated')
                                let elapsed = this.now() - state.eventStopTime
                                if (shortModeOk || shortTimeOk && shortDelayMinutes ) {
                                    if (elapsed >= shortDelayMinutes ? shortDelayMinutes : 0 * 60000 - 2000) {
                                        this.deactivateHue()
                                    }
                                } else {
                                    if (delayMinutes) {
                                        if (elapsed >= delayMinutes ? delayMinutes : 0 * 60000 - 2000) {
                                            this.deactivateHue()
                                        }
                                    }
                                }
                            } else {
                                if (state.lastStatus != 'on' && event.integerValue < lightOnValue ? lightOnValue : 100 && switchOff != true) {
                                    log.info('Light was not on and brightness was too low')
                                    this.activateHue()
                                }
                            }
                        } else {
                            if (state.lastStatus != 'on' && event.integerValue < lightOnValue ? lightOnValue : 100) {
                                log.info('Light was not on and brightness was too low')
                                this.activateHue()
                            }
                        }
                    }
                }
            

	})

    .subscribedEventHandler('eventOffHandler', (context, event) => {
        
                log.trace("eventHandler: ${event.name}: ${event.value}")
                state.eventStopTime = this.now()
                if (event.name == 'switch' && event.value == 'off' && moodOk ) {
                    log.info('Switch was set to off. Starting timer to switch off.')
                    this.runIn(shortDelayMinutes * 60, turnOffAfterDelayShort, ['overwrite': false])
                } else {
                    if (switchOff && modeOk && daysOk && timeOk && moodOk ) {
                        log.info('Switches are off and all checks passed')
                        if (shortModeOk || shortTimeOk && shortDelayMinutes ) {
                            log.info('Now starting short timer to switch off')
                            this.runIn(shortDelayMinutes * 60, turnOffAfterDelayShort, ['overwrite': false])
                        } else {
                            if (delayMinutes) {
                                log.info('Now starting normal timer to switch off')
                                this.runIn(delayMinutes * 60, turnOffAfterDelay, ['overwrite': false])
                            } else {
                                log.info('Now starting to switch off')
                                this.turnOffAfterDelay()
                            }
                        }
                    } else {
                        if (switchOff && moodOk ) {
                            log.info('Now starting 30 minute timer for backup off switching')
                            this.runIn(30 * 60, turnOffAfterDelay, ['overwrite': false])
                        }
                    }
                }
            

	})
