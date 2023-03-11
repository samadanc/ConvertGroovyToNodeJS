
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.runEvery5Minutes('watchDog', delay);

    })

    .scheduledEventHandler('watchDog', (context, event) => {
        
                let secondsSinceLastProcessCompleted = this.now() - atomicState.lastProcessCompletedTime / 1000
                if (secondsSinceLastProcessCompleted > 290) {
                    this.sendNotificationMessage('Warning: Demand Manager has not successfully run in the last 5 minutes. Reinitializing', 'anomaly')
                    this.unsubscribe()
                    this.unschedule()
                    this.initialize()
                }
            

	})
