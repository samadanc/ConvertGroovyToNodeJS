
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('powerHandler', (context, event) => {
        
                if (parent.loggingOn) {
                    console.log("Notify got event $evt from ${event.displayName}")
                }
                let powerValue = event.value.toDouble()
                if (powerValue > tooHigh || powerValue < tooLow ) {
                    this.eventHandler(evt)
                } else {
                    if (parent.loggingOn) {
                        console.log('Power within limits, no action taken.')
                    }
                }
            

	})

    .subscribedEventHandler('eventHandler', (context, event) => {
        
                if (parent.loggingOn) {
                    console.log("Notify got event $evt from ${event.displayName}")
                }
                if (frequency) {
                    let lastTime = state[event.deviceId]
                    if (lastTime == null || this.now() - lastTime >= frequency * 60000) {
                        if (parent.loggingOn) {
                            console.log('frequency used and it is time for new message, checking if within time/day/mode/switch parameters')
                        }
                        if (allOk) {
                            this.createInstantMessage(event.name, event.value, event.device)
                        }
                        state[event.deviceId] = this.now()
                    } else {
                        if (parent.loggingOn) {
                            console.log('frequency used but it is too early to send a new message')
                        }
                    }
                } else {
                    if (parent.loggingOn) {
                        console.log('frequency not used, checking if within time/day/mode/switch parameters')
                    }
                    if (allOk) {
                        this.createInstantMessage(event.name, event.value, event.device)
                    }
                }
            

	})

    .subscribedEventHandler('doorClosed', (context, event) => {
        
                state.lastClosed = this.now()
            

	})

    .subscribedEventHandler('knockAcceleration', (context, event) => {
        
                let delay = knockDelay ? knockDelay : 5
                this.runIn(delay, 'doorKnock')
            

	})

    .subscribedEventHandler('tempHandler', (context, event) => {
        
                let tempState = temp.currentState('temperature')
                if (tempState.doubleValue > tooHot || tempState.doubleValue < tooCold ) {
                    this.eventHandler(evt)
                } else {
                    if (parent.loggingOn) {
                        console.log('Temp within limits, no action taken.')
                    }
                }
            

	})
