
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.runOnce('setZenDeskEventHandler', delay);

    })

    .scheduledEventHandler('setZenDeskEventHandler', (context, event) => {
        
                while (1) {
                    this.runIn(15, zenDeskUpdate)
                }
            

	})
