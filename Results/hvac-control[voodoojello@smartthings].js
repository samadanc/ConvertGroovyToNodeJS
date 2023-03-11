
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'alarmSystemStatus', 'shmHandler')

    })

    .subscribedEventHandler('shmHandler', (context, event) => {
        
                this.logger('info', 'shmHandler', "Smart Home Monitor ${event.name} changed to ${event.value}")
                state.shmStatus = event.value
                this.poll()
            

	})

    .subscribedEventHandler('pwsHandler', (context, event) => {
        
                this.logger('info', 'pwsHandler', "PWS ${event.name} changed to ${event.value}")
                this.poll()
            

	})
