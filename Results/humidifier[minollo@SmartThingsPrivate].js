
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Choose a humidity sensor... ', section => {
            section.deviceSetting('sensor').capability(['relativeHumidityMeasurement']).name('Sensor');
            section.deviceSetting('weather').capability(['relativeHumidityMeasurement']).name('Weather Station');
            section.numberSetting('humiditySetpoint').name('Humidity Target');

        });


        page.section('Select the humidifier switch(es)... ', section => {
            section.deviceSetting('humidifiers').capability(['switch']).name('Humidifiers');

        });


        page.section('Select the thermostat controlling the temperature...', section => {
            section.deviceSetting('thermostat').capability(['thermostat']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.thermostat, 'thermostat', 'temperature', 'temperatureHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.thermostat, 'thermostat', 'heatingSetpoint', 'heatingSetpointHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.thermostat, 'thermostat', 'thermostatOperatingState', 'operatingStateHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.sensor, 'relativeHumidityMeasurement', 'humidity', 'humidityHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.weather, 'relativeHumidityMeasurement', 'humidity', 'weatherHumidityHandler')

        context.api.schedules.runIn('initialize', delay);

    })

    .subscribedEventHandler('humidityHandler', (context, event) => {
        
        console.log("Humidity event received: $evt")
        if (event.value) {
        
        context.api.devices.sendCommands(context.config.thermostat, 'thermostat', handleHumidifiers)
    
        }
        if (thermostat != null) {
        
        context.api.devices.sendCommands(context.config.thermostat, 'thermostat', poll)
    
        }
        

	})

    .subscribedEventHandler('temperatureHandler', (context, event) => {
        
        console.log("Temperature event received: $evt")
        if (event.value) {
        
        context.api.devices.sendCommands(context.config.sensor, 'relativeHumidityMeasurement', handleHumidifiers)
    
        }
        

	})

    .subscribedEventHandler('weatherHumidityHandler', (context, event) => {
        
        console.log("Weather humidity event received: $evt")
        if (event.value) {
        
        context.api.devices.sendCommands(context.config.sensor, 'relativeHumidityMeasurement', handleHumidifiers)
    
        }
        

	})

    .subscribedEventHandler('heatingSetpointHandler', (context, event) => {
        
        console.log("Heating setpoint event received: $evt")
        if (event.value) {
        
        context.api.devices.sendCommands(context.config.sensor, 'relativeHumidityMeasurement', handleHumidifiers)
    
        }
        

	})

    .subscribedEventHandler('operatingStateHandler', (context, event) => {
        
        console.log("Operating state event received: ${event.value}")
        if (event.value != 'heating') {
        log.info('Thermostat is not heating: make sure humidifiers are off')
        
        context.api.devices.sendCommands(context.config.humidifiers, 'switch', off)
    
        } else {
        
        context.api.devices.sendCommands(context.config.sensor, 'relativeHumidityMeasurement', handleHumidifiers)
    
        }
        

	})

    .scheduledEventHandler('initialize', (context, event) => {
        
        console.log('Initializing...')
        
        context.api.devices.sendCommands(context.config.sensor, 'relativeHumidityMeasurement', handleHumidifiers)
    
        

	})
