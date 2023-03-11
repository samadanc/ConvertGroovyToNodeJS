
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Choose a temperature sensor... ', section => {
            section.deviceSetting('sensor').capability(['temperatureMeasurement']).name('Sensor');

        });


        page.section('Select the ceiling fan outlet or switch.', section => {
            section.deviceSetting('outlets').capability(['switch']).name('Outlets');

        });


        page.section('Set the desired setpoint...', section => {

        });


        page.section('Set the desired differential temperature (2 deg default)', section => {

        });


        page.section('Select fan mode.', section => {
            section.enumSetting('fanMode').name('Heating or cooling?');

        });


        page.section('Enable control.', section => {
            section.booleanSetting('enable').name('Enable?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'mode', 'modeChangeHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.sensor, 'temperatureMeasurement', 'temperature', 'temperatureHandler')

    })

    .subscribedEventHandler('modeChangeHandler', (context, event) => {
        
        console.log("mode changed to ${event.value}")
        

	})

    .subscribedEventHandler('temperatureHandler', (context, event) => {
        
        this.handleTemperature(event.doubleValue)
        

	})
