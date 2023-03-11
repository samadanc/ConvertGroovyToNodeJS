
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Choose thermostat... ', section => {
            section.deviceSetting('thermostat').capability(['thermostat']).name('');

        });


        page.section('Heat setting...', section => {
            section.numberSetting('heatingSetpoint').name('Degrees Fahrenheit?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.thermostat, 'thermostat', 'heatingSetpoint', 'heatingSetpointHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.thermostat, 'thermostat', 'temperature', 'temperatureHandler')

    })

    .subscribedEventHandler('heatingSetpointHandler', (context, event) => {
        
        console.log("heatingSetpoint: $evt, $settings")
        

	})

    .subscribedEventHandler('temperatureHandler', (context, event) => {
        
        console.log("currentTemperature: $evt, $settings")
        

	})
