
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'position', 'locationPositionChange')

    })

    .subscribedEventHandler('locationPositionChange', (context, event) => {
        
                this.debug("locationPositionChange(${event.descriptionText})", 'warn')
                this.initialize()
            

	})

    .subscribedEventHandler('presenceHandler', (context, event) => {
        
                this.debug("presenceHandler event: ${event.descriptionText}", 'trace', 1)
                this.setPresence()
                this.debug('presenceHandler complete', 'trace', -1)
            

	})

    .subscribedEventHandler('simHandler', (context, event) => {
        
                this.debug("simHandler event: ${event.displayName} set to ${event.value}", 'info')
            

	})
