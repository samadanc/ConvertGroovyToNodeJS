
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Which Thermostat', section => {
            section.deviceSetting('thermostat').capability(['thermostat']).name('Where?');

        });


        page.section('When the temperature difference is too low', section => {
            section.deviceSetting('temperatureSensor').capability(['temperatureMeasurement']).name('Where?');

        });


        page.section('By a difference of', section => {

        });


        page.section('maximum', section => {

        });


        page.section('Turn on which heater outlet', section => {
            section.deviceSetting('outlet').capability(['switch']).name('Which?');

        });


        page.section('Enable only in these modes', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.thermostat, 'thermostat', 'thermostatOperatingState', 'executeCheck')

        await context.api.subscriptions.subscribeToDevices(context.config.temperatureSensor, 'temperatureMeasurement', 'temperature', 'executeCheck')

        await context.api.subscriptions.subscribeToDevices(context.config.thermostat, 'thermostat', 'thermostatMode', 'executeCheck')

        await context.api.subscriptions.subscribeToDevices(context.config.thermostat, 'thermostat', 'presence', 'executeCheck')

        await context.api.subscriptions.subscribeToDevices(context.config.thermostat, 'thermostat', 'temperature', 'executeCheck')

        await context.api.subscriptions.subscribeToDevices(context.config.thermostat, 'thermostat', 'heatingSetpoint', 'executeCheck')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'mode', 'executeCheck')

    })

    .subscribedEventHandler('executeCheck', (context, event) => {
        
        this.temperatureCheck()
        

	})
