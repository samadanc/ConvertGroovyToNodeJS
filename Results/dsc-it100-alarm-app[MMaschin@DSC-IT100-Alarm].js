
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.runIn('alarmStatus', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'alarmSystemStatus', 'alarmHandler')

    })

    .subscribedEventHandler('alarmHandler', (context, event) => {
        
                if (!settings.enableSHM) {
                    return null
                }
                if (state.alarmSystemStatus == event.value) {
                    return null
                }
                state.alarmSystemStatus = event.value
                if (event.value == 'stay') {
                    this.sendCommand('/api/alarmArmStay')
                }
                if (event.value == 'away') {
                    this.sendCommand('/api/alarmArmAway')
                }
                if (event.value == 'off') {
                    this.sendCommand('/api/alarmDisarm')
                }
            

	})

    .scheduledEventHandler('alarmStatus', (context, event) => {
        
                this.sendCommand('/api/alarmUpdate')
            

	})
