
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Choose a thermostat...', section => {
            section.deviceSetting('thermostatActual').capability(['thermostat']).name('Thermostat');

        });


        page.section('Choose a temperature sensor...', section => {
            section.deviceSetting('sensor').capability(['temperatureMeasurement']).name('Sensor');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.sensor, 'temperatureMeasurement', 'temperatureMeasurement', 'temperatureHandler')

    })

    .subscribedEventHandler('refreshHandler', (context, event) => {
        
        console.log('refreshHandler called')
        thermostat.setTemperature(sensor.temperatureMeasurement)
        

	})
