
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Log devices...', section => {
            section.deviceSetting('temperatures').capability(['temperatureMeasurement']).name('Temperatures');
            section.deviceSetting('contacts').capability(['contactSensor']).name('Doors open/close');
            section.deviceSetting('accelerations').capability(['accelerationSensor']).name('Accelerations');
            section.deviceSetting('motions').capability(['motionSensor']).name('Motions');
            section.deviceSetting('presences').capability(['presenceSensor']).name('Presence');
            section.deviceSetting('switches').capability(['switch']).name('Switches');
            section.deviceSetting('waterSensors').capability(['waterSensor']).name('Water Sensors');
            section.deviceSetting('lightSensors').capability(['illuminanceMeasurement']).name('Light Sensors');
            section.deviceSetting('humiditySensors').capability(['relativeHumidityMeasurement']).name('Humidity Sensors');
            section.deviceSetting('powerMeters').capability(['powerMeter']).name('Power Meters');
            section.deviceSetting('energyMeters').capability(['energyMeter']).name('Energy Meters');
            section.deviceSetting('powerSources').capability(['powerSource']).name('Power Sources');
            section.deviceSetting('batteries').capability(['battery']).name('Batteries');
            section.deviceSetting('voltageMeters').capability(['voltageMeasurement']).name('Voltage Meters');
            section.deviceSetting('buttons').capability(['button']).name('Buttons');

        });


        page.section('SmartStreams Feed PUT API key...', section => {
            section.textSetting('api_uri').name('API Endpoint');
            section.textSetting('api_key').name('PUT API key');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.buttons, 'button', 'button', 'handleButtonEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.energyMeters, 'energyMeter', 'energy', 'handleEnergyEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.lightSensors, 'illuminanceMeasurement', 'illuminance', 'handleLightEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.voltageMeters, 'voltageMeasurement', 'voltage', 'handleVoltageEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.temperatures, 'temperatureMeasurement', 'temperature', 'handleTemperatureEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.batteries, 'battery', 'battery', 'handleBatteryEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.motions, 'motionSensor', 'motion', 'handleMotionEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.accelerations, 'accelerationSensor', 'acceleration', 'handleAccelerationEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.contacts, 'contactSensor', 'contact', 'handleContactEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.powerSources, 'powerSource', 'powerSource', 'handlePowerSourceEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.switches, 'switch', 'switch', 'handleSwitchEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.humiditySensors, 'relativeHumidityMeasurement', 'humidity', 'handleHumidityEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.powerMeters, 'powerMeter', 'power', 'handlePowerEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.waterSensors, 'waterSensor', 'water', 'handleWaterEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.presences, 'presenceSensor', 'presence', 'handlePresenceEvent')

    })

    .subscribedEventHandler('handleContactEvent', (context, event) => {
        
        this.sendValue(evt)
        

	})

    .subscribedEventHandler('handleVoltageEvent', (context, event) => {
        
        this.sendValue(evt)
        

	})

    .subscribedEventHandler('handlePresenceEvent', (context, event) => {
        
        this.sendValue(evt)
        

	})

    .subscribedEventHandler('handleTemperatureEvent', (context, event) => {
        
        this.sendValue(evt)
        

	})

    .subscribedEventHandler('handlePowerSourceEvent', (context, event) => {
        
        this.sendValue(evt)
        

	})

    .subscribedEventHandler('handlePowerEvent', (context, event) => {
        
        this.sendValue(evt)
        

	})

    .subscribedEventHandler('handleSwitchEvent', (context, event) => {
        
        this.sendValue(evt)
        

	})

    .subscribedEventHandler('handleButtonEvent', (context, event) => {
        
        this.sendValue(evt)
        

	})

    .subscribedEventHandler('handleHumidityEvent', (context, event) => {
        
        this.sendValue(evt)
        

	})

    .subscribedEventHandler('handleAccelerationEvent', (context, event) => {
        
        this.sendValue(evt)
        

	})

    .subscribedEventHandler('handleLightEvent', (context, event) => {
        
        this.sendValue(evt)
        

	})

    .subscribedEventHandler('handleEnergyEvent', (context, event) => {
        
        this.sendValue(evt)
        

	})

    .subscribedEventHandler('handleMotionEvent', (context, event) => {
        
        this.sendValue(evt)
        

	})

    .subscribedEventHandler('handleBatteryEvent', (context, event) => {
        
        this.sendValue(evt)
        

	})

    .subscribedEventHandler('handleWaterEvent', (context, event) => {
        
        this.sendValue(evt)
        

	})
