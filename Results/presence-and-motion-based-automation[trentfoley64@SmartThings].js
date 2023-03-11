
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('motionHandler', (context, event) => {
        
                console.log("motionHandler ${event.name}: ${event.value}")
                if (event.value == 'active') {
                    state.motionReported = true
                } else {
                    if (event.value == 'inactive') {
                        state.motionReported = false
                        this.runIn(motionDelayMins * 60, scheduledMotionCheck)
                    }
                }
            

	})
