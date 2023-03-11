
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('beginSprinklerProcess', delay);

    })

    .subscribedEventHandler('stopHandler', (context, event) => {
        
                if (event.value == 'on') {
                    state.finishedRunning = true
                    this.endSprinkler()
                }
            

	})

    .subscribedEventHandler('startHandler', (context, event) => {
        
                event.value == 'on' ? this.beginSprinklerProcess() : null
            

	})

    .scheduledEventHandler('beginSprinklerProcess', (context, event) => {
        
                let rainDelayDays = this.getGlobalVar(rainDelayVariable).value
                this.logDebug("Rain delay days: $rainDelayDays")
                if (rainDelayDays != null && rainDelayDays != 0) {
                    this.logDebug('Rain delay is active. Not running automation.')
                    return null
                }
                if (pauseSchedule) {
                    this.logDebug('Schedule is paused. Not running automation.')
                    return null
                }
                this.logDebug('Beginning scheduled sprinklers')
                this.allOff()
                state.currentSprinkler = 1
                state.finishedRunning = false
                this.startSprinkler()
            

	})
