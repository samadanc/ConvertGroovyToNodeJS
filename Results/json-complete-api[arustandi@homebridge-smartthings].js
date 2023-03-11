
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'null', 'HubResponseEvent')

    })

    .subscribedEventHandler('HubResponseEvent', (context, event) => {
        
                console.log(event.description)
            

	})
