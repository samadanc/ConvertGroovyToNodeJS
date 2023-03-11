
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('subscribeToDevices', delay);

    })

    .scheduledEventHandler('subscribeToDevices', (context, event) => {
        
                this.debug('subscribeToDevices() called')
                let devices = this.getAllChildDevices()
                devices.each({ let d ->
                    this.debug('Call subscribe on ' + d.id)
                    d.subscribe()
                })
            

	})
