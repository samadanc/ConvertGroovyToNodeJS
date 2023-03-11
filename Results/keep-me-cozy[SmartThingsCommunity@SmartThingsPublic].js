
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Choose thermostat... ', section => {
            section.deviceSetting('thermostat').capability(['thermostat']).name('');

        });


        page.section('Heat setting...', section => {
            section.numberSetting('heatingSetpoint').name('Degrees?');

        });


        page.section('Air conditioning setting...', section => {
            section.numberSetting('coolingSetpoint').name('Degrees?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.thermostat, 'thermostat', 'heatingSetpoint', 'heatingSetpointHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.thermostat, 'thermostat', 'temperature', 'temperatureHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.thermostat, 'thermostat', 'coolingSetpoint', 'coolingSetpointHandler')

    })

    .subscribedEventHandler('heatingSetpointHandler', (context, event) => {
        
        console.log("heatingSetpoint: $evt, $settings")
        

	})

    .subscribedEventHandler('coolingSetpointHandler', (context, event) => {
        
        console.log("coolingSetpoint: $evt, $settings")
        

	})

    .subscribedEventHandler('temperatureHandler', (context, event) => {
        
        console.log("currentTemperature: $evt, $settings")
        

	})
