
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('scheduledTimeOffHandler', delay);

        context.api.schedules.schedule('scheduledTimeHandler', delay);

    })

    .subscribedEventHandler('eventHandler', (context, event) => {
        
                log.trace("eventHandler: ${event.name}: ${event.value}")
                state.eventStopTime = null
                if (modeOk && daysOk && timeOk ) {
                    if (darkOk && moodOk ) {
                        this.activateHue()
                    }
                }
            

	})

    .subscribedEventHandler('illuminanceHandler', (context, event) => {
        
                if (modeOk && daysOk && timeOk ) {
                    if (state.lastStatus != 'off' && event.integerValue > lightOffValue ? lightOffValue : 150) {
                        this.deactivateHue()
                    } else {
                        if (state.eventStopTime) {
                            if (state.lastStatus != 'off' && switchOk ) {
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
                                if (state.lastStatus != 'on' && event.integerValue < lightOnValue ? lightOnValue : 100 && switchOk != true) {
                                    this.activateHue()
                                }
                            }
                        } else {
                            if (state.lastStatus != 'on' && event.integerValue < lightOnValue ? lightOnValue : 100) {
                                this.activateHue()
                            }
                        }
                    }
                }
            

	})

    .subscribedEventHandler('eventOffHandler', (context, event) => {
        
                log.trace("eventHandler: ${event.name}: ${event.value}")
                state.eventStopTime = this.now()
                if (event.name == 'switch' && event.value == 'off') {
                    this.runIn(shortDelayMinutes * 60, turnOffAfterDelayShort, ['overwrite': false])
                } else {
                    if (switchOk && modeOk && daysOk && timeOk ) {
                        if (shortModeOk || shortTimeOk && shortDelayMinutes ) {
                            this.runIn(shortDelayMinutes * 60, turnOffAfterDelayShort, ['overwrite': false])
                        } else {
                            if (delayMinutes) {
                                this.runIn(delayMinutes * 60, turnOffAfterDelay, ['overwrite': false])
                            } else {
                                this.turnOffAfterDelay()
                            }
                        }
                    } else {
                        if (switchOk) {
                            this.runIn(30 * 60, turnOffAfterDelay, ['overwrite': false])
                        }
                    }
                }
            

	})

    .scheduledEventHandler('scheduledTimeOffHandler', (context, event) => {
        
                this.pause(2000)
                this.deactivateHue()
            

	})

    .scheduledEventHandler('scheduledTimeHandler', (context, event) => {
        
                this.pause(2000)
                this.activateHue()
            

	})
