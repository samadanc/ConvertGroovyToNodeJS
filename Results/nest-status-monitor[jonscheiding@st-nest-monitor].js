
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Title', section => {
            section.deviceSetting('thermostat').capability(['thermostatOperatingState']).name('Thermostat');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.thermostat, 'thermostatOperatingState', 'thermostatOperatingState', 'onOperatingStateChange')

        await context.api.subscriptions.subscribeToDevices(context.config.thermostat, 'thermostatOperatingState', 'temperature', 'onTemperatureChange')

    })

    .subscribedEventHandler('onOperatingStateChange', (context, event) => {
        
        log.info("Operating state changed to ${thermostat.currentThermostatOperatingState}.")
        state.timeEnteredCurrentState = this.now()
        

	})

    .subscribedEventHandler('onTemperatureChange', (context, event) => {
        
        let timeInCurrentStateThreshold = 15 * 60
        let timeInCurrentState = this.now() - state.timeEnteredCurrentState / 1000
        log.info("Current temperature is ${thermostat.currentTemperature}.")
        let warn = false
        switch (thermostat.currentThermostatOperatingState) {
        case 'heating':
        warn = thermostat.currentTemperature < state.lastTemperature
        break
        case 'cooling':
        warn = thermostat.currentTemperature > state.lastTemperature
        break
        }
        if (warn) {
        let message = "Thermostat has been ${thermostat.currentThermostatOperatingState} " + "for ${this.getDisplayTime(timeInCurrentState)}, " + 'but the temperature has changed ' + "from ${state.lastTemperature} " + "to ${thermostat.currentTemperature}."
        log.info(message)
        if (timeInCurrentState >= timeInCurrentStateThreshold ) {
        this.sendPush(message)
        }
        }
        state.lastTemperature = thermostat.currentTemperature
        

	})
