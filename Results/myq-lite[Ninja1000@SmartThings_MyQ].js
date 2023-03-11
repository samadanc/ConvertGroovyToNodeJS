
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.runEvery30Minutes('refreshAll', delay);

        context.api.schedules.runEvery3Hours('updateVersionInfo', delay);

    })

    .subscribedEventHandler('sensorHandler', (context, event) => {
        
                console.log('Sensor change detected: Event name  ' + event.name + ' value: ' + event.value + ' deviceID: ' + event.deviceId)
                state.validatedDoors.each({ let door ->
                    if (settings[state.data[ door ].sensor]?.id == event.deviceId) {
                        this.updateDoorStatus(state.data[ door ].child, settings[state.data[ door ].sensor], null, state.data[ door ].name)
                    }
                })
            

	})

    .scheduledEventHandler('refreshAll', (context, event) => {
        
                this.syncDoorsWithSensors()
            

	})

    .scheduledEventHandler('updateVersionInfo', (context, event) => {
        
                this.getVersionInfo('versionCheck', this.appVersion())
            

	})
