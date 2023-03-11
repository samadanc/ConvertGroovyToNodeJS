
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.runEvery5Minutes('subscribeToDevices', delay);

    })

    .scheduledEventHandler('subscribeToDevices', (context, event) => {
        
                log.trace('Executing \'subscribeToDevices\'')
                let devices = this.getAllChildDevices()
                devices.each({ let d ->
                    d.subscribe()
                })
            

	})
