
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section(''Title'', section => {

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('todlate', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunrise', 'sunriseHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunset', 'sunsetHandler')

        context.api.schedules.schedule('todnight', delay);

    })

    .subscribedEventHandler('sunriseHandler', (context, event) => {
        
                log.trace("Running sunriseHandler - data: $evt")
                this.sunriseTurnOn(event.value)
            

	})

    .subscribedEventHandler('sunsetHandler', (context, event) => {
        
                log.trace("Running sunsetHandler - data: $evt")
                this.sunsetTurnOn(event.value)
            

	})

    .scheduledEventHandler('todlate', (context, event) => {
        
                this.sendautobrite(20)
            

	})

    .scheduledEventHandler('todnight', (context, event) => {
        
                this.sendautobrite(50)
            

	})
