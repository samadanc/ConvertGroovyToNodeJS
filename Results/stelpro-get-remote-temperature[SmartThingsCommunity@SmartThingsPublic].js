
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Choose remote device to read temperature from... ', section => {
            section.deviceSetting('sensor').capability(['temperatureMeasurement']).name('Select a remote temperature reading device');

        });


        page.section('Choose the Stelpro thermostats that will receive the remote device\'s temperature... ', section => {
            section.deviceSetting('thermostats').capability(['thermostat']).name('Select Stelpro Thermostats');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.sensor, 'temperatureMeasurement', 'temperature', 'temperatureHandler')

    })

    .subscribedEventHandler('temperatureHandler', (context, event) => {
        
        console.log("temperature received from remote device: ${event?.value}")
        if (event?.value) {
        thermostats?.setOutdoorTemperature(event.value)
        }
        

	})
