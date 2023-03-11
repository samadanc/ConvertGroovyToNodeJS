
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
        
                this.logger('info', 'shmHandler', "Smart Home Monitor ${event.name} changed from ${state.shmStatus} to ${event.value} [Enabled: $srLightingEnable]")
                state.shmStatus = event.value
                this.poll()
            

	})

    .subscribedEventHandler('srHandler', (context, event) => {
        
                this.logger('info', 'srHandler', "Solar Radiation Measurement ${event.name} changed from ${state.solarRadiation} to ${event.value} [Enabled: $srLightingEnable]")
                state.solarRadiation = event.value
                this.poll()
            

	})
