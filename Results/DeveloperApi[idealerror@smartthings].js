
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Allow Endpoint to Control These Things...', section => {
            section.deviceSetting('switches').capability(['switch']).name('Which Switches?');
            section.deviceSetting('dimmers').capability(['switchLevel']).name('Which Dimmers?');
            section.deviceSetting('thermostats').capability(['thermostat']).name('Which Thermostats?');
            section.deviceSetting('motions').capability(['motionSensor']).name('Which Motions?');
            section.deviceSetting('accelerations').capability(['accelerationSensor']).name('Which Accelerations?');
            section.deviceSetting('contacts').capability(['contactSensor']).name('Which Contacts?');
            section.deviceSetting('illuminants').capability(['illuminanceMeasurement']).name('Which Illuminance Sensors?');
            section.deviceSetting('temperatures').capability(['temperatureMeasurement']).name('Which Temperatures?');
            section.deviceSetting('humidities').capability(['relativeHumidityMeasurement']).name('Which Humidities?');
            section.deviceSetting('presences').capability(['presenceSensor']).name('Which Presence?');
            section.deviceSetting('locks').capability(['lock']).name('Which Locks?');
            section.deviceSetting('batteries').capability(['battery']).name('Which Batteries?');
            section.deviceSetting('powers').capability(['powerMeter']).name('Power Meters');
            section.deviceSetting('energys').capability(['energyMeter']).name('Energy Meters');
            section.deviceSetting('dioxides').capability(['carbonDioxideMeasurement']).name('Co2 Measurement');
            section.deviceSetting('signals').capability(['signalStrength']).name('Signal Strength');
            section.deviceSetting('leaks').capability(['waterSensor']).name('Water Detection');
            section.deviceSetting('sounds').capability(['soundPressureLevel']).name('Sound Pressure');
            section.deviceSetting('colors').capability(['colorControl']).name('Color');
            section.deviceSetting('colorTemperatures').capability(['colorTemperature']).name('Color Temperature');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.dioxides, 'carbonDioxideMeasurement', 'dioxide', 'handleDioxideEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.signals, 'signalStrength', 'signal', 'handleSignalEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.locks, 'lock', 'locks', 'handleDoorLockEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.dimmers, 'switchLevel', 'level', 'handleSwitchLevelEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.temperatures, 'temperatureMeasurement', 'temperature', 'handleTemperatureEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.powers, 'powerMeter', 'power', 'handlePowerEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.batteries, 'battery', 'battery', 'handleBatteryEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.leaks, 'waterSensor', 'leak', 'handleLeakEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.motions, 'motionSensor', 'motion', 'handleMotionEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.accelerations, 'accelerationSensor', 'acceleration', 'handleAccelerationEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.humidities, 'relativeHumidityMeasurement', 'humidity', 'handleHumidityEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.contacts, 'contactSensor', 'contact', 'handleContactEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.switches, 'switch', 'switch', 'handleSwitchEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.energys, 'energyMeter', 'energy', 'handleEnergyEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.sounds, 'soundPressureLevel', 'sound', 'handleSoundEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.illuminants, 'illuminanceMeasurement', 'illuminance', 'handleIlluminanceEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.colors, 'colorControl', 'color', 'handleColorEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.presences, 'presenceSensor', 'presence', 'handlePresenceEvent')

    })

    .subscribedEventHandler('handleContactEvent', (context, event) => {
        
        this.logField(evt, {
        it == 'open' ? '1' : '0'
        })
        

	})

    .subscribedEventHandler('handleDoorLockEvent', (context, event) => {
        
        this.logField(evt, {
        it == 'locked' ? 'locked' : 'unlocked'
        })
        

	})

    .subscribedEventHandler('handlePresenceEvent', (context, event) => {
        
        this.logField(evt, {
        it.toString()
        })
        

	})

    .subscribedEventHandler('handleTemperatureEvent', (context, event) => {
        
        this.logField(evt, {
        it.toString()
        })
        

	})

    .subscribedEventHandler('handleSignalEvent', (context, event) => {
        
        this.logField(evt, {
        it.toString()
        })
        

	})

    .subscribedEventHandler('handleSoundEvent', (context, event) => {
        
        this.logField(evt, {
        it.toString()
        })
        

	})

    .subscribedEventHandler('handleColorEvent', (context, event) => {
        
        this.logField(evt, {
        it.toString()
        })
        

	})

    .subscribedEventHandler('handleDioxideEvent', (context, event) => {
        
        this.logField(evt, {
        it.toString()
        })
        

	})

    .subscribedEventHandler('handlePowerEvent', (context, event) => {
        
        this.logField(evt, {
        it.toString()
        })
        

	})

    .subscribedEventHandler('handleLeakEvent', (context, event) => {
        
        this.logField(evt, {
        it.toString()
        })
        

	})

    .subscribedEventHandler('handleHumidityEvent', (context, event) => {
        
        this.logField(evt, {
        it.toString()
        })
        

	})

    .subscribedEventHandler('handleBatteryEvent', (context, event) => {
        
        this.logField(evt, {
        it.toString()
        })
        

	})

    .subscribedEventHandler('handleAccelerationEvent', (context, event) => {
        
        this.logField(evt, {
        it == 'active' ? '1' : '0'
        })
        

	})

    .subscribedEventHandler('handleSwitchLevelEvent', (context, event) => {
        
        this.logField(evt, {
        it.toString()
        })
        

	})

    .subscribedEventHandler('handleEnergyEvent', (context, event) => {
        
        this.logField(evt, {
        it.toString()
        })
        

	})

    .subscribedEventHandler('handleMotionEvent', (context, event) => {
        
        this.logField(evt, {
        it == 'active' ? '1' : '0'
        })
        

	})

    .subscribedEventHandler('handleSwitchEvent', (context, event) => {
        
        this.logField(evt, {
        it.toString()
        })
        

	})

    .subscribedEventHandler('handleIlluminanceEvent', (context, event) => {
        
        this.logField(evt, {
        it.toString()
        })
        

	})
