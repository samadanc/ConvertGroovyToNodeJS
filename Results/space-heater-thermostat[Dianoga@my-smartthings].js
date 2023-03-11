
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Devices', section => {
            section.deviceSetting('thermostat').capability(['thermostat']).name('Thermostat');
            section.deviceSetting('heaters').capability(['switch']).name('Heaters');
            section.deviceSetting('temperature').capability(['temperatureMeasurement']).name('Temperature');

        });


        page.section('Settings', section => {
            section.numberSetting('offset').name('Temperature Offset');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.thermostat, 'thermostat', 'thermostatMode', 'handleEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.thermostat, 'thermostat', 'heatingSetpoint', 'handleEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.temperature, 'temperatureMeasurement', 'temperature', 'handleEvent')

    })

    .subscribedEventHandler('handleEvent', (context, event) => {
        
        let thermostatModes = ['heat', 'auto', 'emergencyHeat']
        console.log("Thermostat Mode: ${thermostat.currentThermostatMode} | Temperature: ${temperature.currentTemperature}")
        if (thermostatModes.any({
        it == thermostat.currentThermostatMode
        })) {
        if (temperature.currentTemperature < thermostat.currentHeatingSetpoint + offset ) {
        console.log('Turning heater(s) on')
        heaters?.on()
        } else {
        console.log('Turning heater(s) off')
        heaters?.off()
        }
        } else {
        console.log('Turning heater(s) off')
        heaters?.off()
        }
        

	})
