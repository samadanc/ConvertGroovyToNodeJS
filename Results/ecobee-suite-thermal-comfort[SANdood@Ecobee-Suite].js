
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.runIn('atomicHumidityUpdater', delay);

    })

    .subscribedEventHandler('programChangeHandler', (context, event) => {
        
                this.LOG("Thermostat Program is: ${event.value}", 3, null, 'info')
                if (!settings.thePrograms || settings.thePrograms?.contains(event.value)) {
                    atomicState.because = " because the thermostat's program changed to ${event.value}"
                    this.runIn(10, atomicHumidityUpdater, ['overwrite': true])
                }
            

	})

    .subscribedEventHandler('modeChangeHandler', (context, event) => {
        
                this.LOG("Thermostat Mode is: ${event.value}", 3, null, 'info')
                if (!settings.statModes || settings.statModes?.contains(event.value)) {
                    atomicState.because = " because the thermostat's mode changed to ${event.value}"
                    this.runIn(5, atomicHumidityUpdater, ['overwrite': true])
                }
            

	})

    .subscribedEventHandler('humidityChangeHandler', (context, event) => {
        
                if (event.numberValue != null) {
                    atomicState.humidity = this.getMultiHumidistats()
                    atomicState.because = " because the ${(settings.multiHumidistats) ? (settings.multiHumidistats +  ) : }humidity changed to ${atomicState.humidity}%"
                    this.runIn(2, atomicHumidityUpdater, ['overwrite': true])
                }
            

	})
