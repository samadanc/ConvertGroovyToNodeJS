
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.runIn('refreshDevices', delay);

        context.api.schedules.runIn('subscribeToDevices', delay);

    })

    .scheduledEventHandler('refreshDevices', (context, event) => {
        
                console.log('refreshDevices() called')
                let devices = this.getAllChildDevices()
                devices.each({ let d ->
                    console.log("Calling refresh() on device: ${d.id}")
                    d.refresh()
                })
                this.runIn(300, 'pollDevices')
            

	})

    .scheduledEventHandler('subscribeToDevices', (context, event) => {
        
                console.log('subscribeToDevices() called')
                let devices = this.getAllChildDevices()
                devices.each({ let d ->
                })
            

	})
