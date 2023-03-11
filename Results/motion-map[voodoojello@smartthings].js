
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'null', 'shmHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'alarmSystemStatus', 'shmHandler')

    })

    .subscribedEventHandler('msHandler', (context, event) => {
        
                this.logger('debug', 'pirHandler', "PIR ${event.displayName} changed to ${event.value}")
                this.poll(event.displayName, event.value)
            

	})

    .subscribedEventHandler('shmHandler', (context, event) => {
        
                this.logger('debug', 'shmHandler', "Smart Home Monitor ${event.name} changed to ${event.value}")
                state.shmStatus = event.value
            

	})
