
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunriseTime', 'sunriseHandler')

        context.api.schedules.schedule('alarmAction', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunsetTime', 'sunsetHandler')

    })

    .subscribedEventHandler('sunriseHandler', (context, event) => {
        
                this.actionRun()
            

	})
