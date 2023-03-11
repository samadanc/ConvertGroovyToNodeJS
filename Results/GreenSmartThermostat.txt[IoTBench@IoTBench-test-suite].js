
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Thermostat', section => {
            section.deviceSetting('thermostat').capability(['thermostat']).name('');

        });


        page.section('When home (day)', section => {
            section.enumSetting('homeFan').name('Fan Mode (optional)');

        });


        page.section('When home (night)', section => {
            section.enumSetting('nightFan').name('Fan Mode (optional)');

        });


        page.section('When away', section => {
            section.enumSetting('awayFan').name('Fan Mode (optional)');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.thermostat, 'thermostat', 'heatingSetpoint', 'heatingSetpointHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.thermostat, 'thermostat', 'temperature', 'temperatureHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.thermostat, 'thermostat', 'coolingSetpoint', 'coolingSetpointHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.thermostat, 'thermostat', 'thermostatFanMode', 'fanModeHandler')

    })

    .subscribedEventHandler('heatingSetpointHandler', (context, event) => {
        
        log.info("heatingSetpoint: $evt, $settings")
        

	})

    .subscribedEventHandler('fanModeHandler', (context, event) => {
        
        log.info("currentFanMode: $evt, $settings")
        

	})

    .subscribedEventHandler('coolingSetpointHandler', (context, event) => {
        
        log.info("coolingSetpoint: $evt, $settings")
        

	})

    .subscribedEventHandler('temperatureHandler', (context, event) => {
        
        log.info("currentTemperature: $evt, $settings")
        

	})
