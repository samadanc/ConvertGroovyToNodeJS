
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'routineExecuted', 'routineExecuted')

    })

    .subscribedEventHandler('routineExecuted', (context, event) => {
        
                if (event.name == 'routineExecuted') {
                    let actions = location.helloHome?.getPhrases()*.label
                    if (actions) {
                        actions.sort()
                        if (settings.onAction == event.displayName) {
                            console.log("Selected Action Triggered. evt name: ${event.displayName}")
                            this.use(TimeCategory, { 
                                let currentDate = new Date()
                                let runAtTime = currentDate + settings.delay_seconds.seconds
                                console.log("Door: ${settings.theLock} will lock at: $runAtTime")
                                this.runOnce(runAtTime, lockDoor)
                            })
                        } else {
                            console.log("Skipping. Action Triggered was: ${event.displayName} & selected action was: ${settings.onAction}")
                        }
                    }
                }
            

	})

    .subscribedEventHandler('lockHandler', (context, event) => {
        
                console.log("Lock ${event.name} is ${event.value}.")
                if (event.value == 'locked') {
                } else {
                }
            

	})
