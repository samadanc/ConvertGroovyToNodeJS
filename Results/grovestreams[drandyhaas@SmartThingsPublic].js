
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Log devices...', section => {
            section.deviceSetting('temperatures').capability(['temperatureMeasurement']).name('Temperatures');
            section.deviceSetting('humidities').capability(['relativeHumidityMeasurement']).name('Humidities');
            section.deviceSetting('contacts').capability(['contactSensor']).name('Doors open/close');
            section.deviceSetting('accelerations').capability(['accelerationSensor']).name('Accelerations');
            section.deviceSetting('luminosities').capability(['illuminanceMeasurement']).name('Luminosities');
            section.deviceSetting('motions').capability(['motionSensor']).name('Motions');
            section.deviceSetting('presence').capability(['presenceSensor']).name('Presence');
            section.deviceSetting('switches').capability(['switch']).name('Switches');
            section.deviceSetting('waterSensors').capability(['waterSensor']).name('Water sensors');
            section.deviceSetting('batteries').capability(['battery']).name('Batteries');
            section.deviceSetting('powers').capability(['powerMeter']).name('Power Meters');
            section.deviceSetting('energies').capability(['energyMeter']).name('Energy Meters');

        });


        page.section('GroveStreams Feed PUT API key...', section => {
            section.textSetting('apiKey').name('API key');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.temperatures, 'temperatureMeasurement', 'temperature', 'handleTemperatureEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.powers, 'powerMeter', 'power', 'handlePowerEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.batteries, 'battery', 'battery', 'handleBatteryEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.presence, 'presenceSensor', 'presence', 'handlePresenceEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.motions, 'motionSensor', 'motion', 'handleMotionEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.luminosities, 'illuminanceMeasurement', 'illuminance', 'handleIlluminanceEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.accelerations, 'accelerationSensor', 'acceleration', 'handleAccelerationEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.energies, 'energyMeter', 'energy', 'handleEnergyEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.humidities, 'relativeHumidityMeasurement', 'humidity', 'handleHumidityEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.switches, 'switch', 'switch', 'handleSwitchEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.contacts, 'contactSensor', 'contact', 'handleContactEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.waterSensors, 'waterSensor', 'water', 'handleWaterEvent')

    })

    .subscribedEventHandler('handleContactEvent', (context, event) => {
        
        this.sendValue(evt, {
        it == 'open' ? 'true' : 'false'
        })
        

	})

    .subscribedEventHandler('handlePresenceEvent', (context, event) => {
        
        this.sendValue(evt, {
        it == 'present' ? 'true' : 'false'
        })
        

	})

    .subscribedEventHandler('handleTemperatureEvent', (context, event) => {
        
        this.sendValue(evt, {
        it.toString()
        })
        

	})

    .subscribedEventHandler('handlePowerEvent', (context, event) => {
        
        this.sendValue(evt, {
        it.toString()
        })
        

	})

    .subscribedEventHandler('handleSwitchEvent', (context, event) => {
        
        this.sendValue(evt, {
        it == 'on' ? 'true' : 'false'
        })
        

	})

    .subscribedEventHandler('handleHumidityEvent', (context, event) => {
        
        this.sendValue(evt, {
        it.toString()
        })
        

	})

    .subscribedEventHandler('handleAccelerationEvent', (context, event) => {
        
        this.sendValue(evt, {
        it == 'active' ? 'true' : 'false'
        })
        

	})

    .subscribedEventHandler('handleEnergyEvent', (context, event) => {
        
        this.sendValue(evt, {
        it.toString()
        })
        

	})

    .subscribedEventHandler('handleMotionEvent', (context, event) => {
        
        this.sendValue(evt, {
        it == 'active' ? 'true' : 'false'
        })
        

	})

    .subscribedEventHandler('handleBatteryEvent', (context, event) => {
        
        this.sendValue(evt, {
        it.toString()
        })
        

	})

    .subscribedEventHandler('handleIlluminanceEvent', (context, event) => {
        
        this.sendValue(evt, {
        it.toString()
        })
        

	})

    .subscribedEventHandler('handleWaterEvent', (context, event) => {
        
        this.sendValue(evt, {
        it == 'wet' ? 'true' : 'false'
        })
        

	})
