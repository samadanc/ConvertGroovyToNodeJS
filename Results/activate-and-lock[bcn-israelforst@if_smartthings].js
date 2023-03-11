
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'routineExecuted', 'routineChanged')

    })

    .subscribedEventHandler('handler', (context, event) => {
        
                if (event.value == 'on') {
                    console.log("Switch turned on, will execute action ${settings.onAction}")
                    if (settings.test_mode) {
                        console.log('TEST MODE: No action taken')
                    } else {
                        location.helloHome?.execute(settings.onAction)
                    }
                    console.log("Will lock the folowing locks: ${settings.locks}")
                    if (settings.test_mode) {
                        console.log('TEST MODE: No action taken')
                    } else {
                        this.runin(settings.delay_seconds, settings.locks.lock())
                    }
                }
            

	})

    .subscribedEventHandler('routineChanged', (context, event) => {
        
                console.log("routineChanged: $evt")
                console.log("evt name: ${event.name}")
                console.log("evt value: ${event.value}")
                console.log("evt displayName: ${event.displayName}")
                console.log("evt descriptionText: ${event.descriptionText}")
            

	})
