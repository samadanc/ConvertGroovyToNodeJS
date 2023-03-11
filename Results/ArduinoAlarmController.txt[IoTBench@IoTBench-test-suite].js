
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.runIn('checkHeartbeat', delay);

    })

    .subscribedEventHandler('zonestatusChanged', (context, event) => {
        
                console.log("zonestatusChanged ${event.value}")
                let states = event.value.split(';')*.toInteger()
                java.lang.Integer eventId = ((states[0]) as int)
                let lastStates = state.lastStatus
                if (lastStates == null) {
                    lastStates = new int[states.size()]
                } else {
                    lastStates = lastStates*.toInteger()
                }
                java.lang.Integer lastEventId = ((lastStates[0]) as int)
                if (lastEventId > eventId && lastEventId < eventId + 2) {
                    console.log("EventId out of order lastEventId: $lastEventId, eventId: $eventId")
                    return null
                }
                for (java.lang.Integer x = 1; x < states.size(); x++) {
                    java.lang.Integer currentState = states[ x ]
                    java.lang.Integer lastState = lastStates[ x ]
                    if (currentState != lastState ) {
                        console.log("zone $x state changed was: $lastState, now $currentState")
                        this.deviceStateChanged(x, currentState)
                    }
                }
                state.lastStatus = states 
            

	})

    .scheduledEventHandler('checkHeartbeat', (context, event) => {
        
                let elapsed = this.now() - state.lastHeartbeat
                console.log("checkHeartbeat elapsed: $elapsed")
                if (elapsed > 30000) {
                    console.log('Haven\'t received heartbeat in a while - alarm is offline')
                    this.sendPush('Arduino Alarm appears to be offline - haven\'t received a heartbeat in over 5 minutes')
                }
            

	})
