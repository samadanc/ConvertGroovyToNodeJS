
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Choose a temperature sensor... ', section => {
            section.deviceSetting('sensor').capability(['temperatureMeasurement']).name('Sensor');

        });


        page.section('Select the SSR302 unit... ', section => {
            section.deviceSetting('outlet').capability(['thermostat']).name('SSR302');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.sensor, 'temperatureMeasurement', 'humidity', 'humidityHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.sensor, 'temperatureMeasurement', 'temperature', 'temperatureHandler')

    })

    .subscribedEventHandler('humidityHandler', (context, event) => {
        
        log.info("Setting humidity: ${event.doubleValue}")
        
        context.api.devices.sendCommands(context.config.outlet, 'thermostat', setHumidity)
    
        

	})

    .subscribedEventHandler('temperatureHandler', (context, event) => {
        
        log.info("Setting temperature: ${event.doubleValue}")
        
        context.api.devices.sendCommands(context.config.outlet, 'thermostat', setTemperature)
    
        

	})
