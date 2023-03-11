
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Choose a Thermostat RTS... ', section => {

        });


        page.section('Select the H-Relay... ', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.sensor, 'device.wiserThermostatRts', 'temperature', 'temperatureReading')

    })

    .subscribedEventHandler('temperatureReading', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.actuator, 'device.wiserHeatingActuators', setActualTemperature)
    
        

	})
