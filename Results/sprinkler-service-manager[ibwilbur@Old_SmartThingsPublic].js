
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.runEvery3Hours('scheduledActionsHandler', delay);

    })

    .scheduledEventHandler('scheduledActionsHandler', (context, event) => {
        
                this.syncDevices()
            

	})
