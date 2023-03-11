
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'routineExecuted', 'routineChanged')

    })

    .subscribedEventHandler('routineChanged', (context, event) => {
        
                if (event.displayName == action ) {
                    this.checkDoor()
                }
            

	})
