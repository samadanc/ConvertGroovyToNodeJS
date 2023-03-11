
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Allow Endpoint to Control These Things...', section => {
            section.deviceSetting('switches').capability(['switch']).name('Which Switches?');
            section.deviceSetting('dimmers').capability(['switchLevel']).name('Which Dimmers?');
            section.deviceSetting('thermostat').capability(['thermostat']).name('Which Thermostats?');
            section.deviceSetting('motions').capability(['motionSensor']).name('Which Motions?');
            section.deviceSetting('accelerations').capability(['accelerationSensor']).name('Which Accelerations?');
            section.deviceSetting('contacts').capability(['contactSensor']).name('Which Contacts?');
            section.deviceSetting('illuminants').capability(['illuminanceMeasurement']).name('Which Illuminance Sensors?');
            section.deviceSetting('temperatures').capability(['temperatureMeasurement']).name('Which Temperatures?');
            section.deviceSetting('humidities').capability(['relativeHumidityMeasurement']).name('Which Humidities?');
            section.deviceSetting('presence').capability(['presenceSensor']).name('Which Presence?');
            section.deviceSetting('lock').capability(['lock']).name('Which Locks?');
            section.deviceSetting('batteries').capability(['battery']).name('Which Batteries?');
            section.deviceSetting('powers').capability(['powerMeter']).name('Power Meters');

        });


        page.section('Allow Endpoint to Control These Things...', section => {
            section.textSetting('restAPIKey').name('Parse.com REST API Key');
            section.textSetting('appKey').name('Parse.com API Application ID');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.illuminants, 'illuminanceMeasurement', 'illuminance', 'illumEventHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.thermostat, 'thermostat', 'coolingSetpoint', 'tstatCoolSPEventHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.thermostat, 'thermostat', 'thermostatOperatingState', 'tstatOpStateEventHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.thermostat, 'thermostat', 'heatingSetpoint', 'tstatHeatSPEventHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.accelerations, 'accelerationSensor', 'acceleration', 'accelEventHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.presence, 'presenceSensor', 'presence', 'presenceEventHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.lock, 'lock', 'lock', 'lockEventHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.dimmers, 'switchLevel', 'level', 'switchLevelEventHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.switches, 'switch', 'switch', 'switchEventHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.thermostat, 'thermostat', 'thermostatMode', 'tstatModeEventHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.powers, 'powerMeter', 'power', 'powerEventHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.thermostat, 'thermostat', 'thermostatFanState', 'tstatFanStateEventHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.thermostat, 'thermostat', 'thermostatSetpoint', 'tstatSPEventHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.contacts, 'contactSensor', 'contact', 'contactEventHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.motions, 'motionSensor', 'motion', 'motionEventHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.humidities, 'relativeHumidityMeasurement', 'humidity', 'humidityEventHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.temperatures, 'temperatureMeasurement', 'temperature', 'tempEventHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.thermostat, 'thermostat', 'thermostatFanMode', 'tstatFanModeEventHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.batteries, 'battery', 'battery', 'batteryEventHandler')

    })

    .subscribedEventHandler('lockEventHandler', (context, event) => {
        
        this.logField(evt, {
        it == 'locked' ? 'locked' : 'unlocked'
        })
        

	})

    .subscribedEventHandler('tstatModeEventHandler', (context, event) => {
        
        this.logField(evt, {
        it.toString()
        })
        

	})

    .subscribedEventHandler('switchLevelEventHandler', (context, event) => {
        
        this.logField(evt, {
        it.toString()
        })
        

	})

    .subscribedEventHandler('humidityEventHandler', (context, event) => {
        
        this.logField(evt, {
        it.toString()
        })
        

	})

    .subscribedEventHandler('tstatSPEventHandler', (context, event) => {
        
        this.logField(evt, {
        it.toString()
        })
        

	})

    .subscribedEventHandler('tstatOpStateEventHandler', (context, event) => {
        
        this.logField(evt, {
        it.toString()
        })
        

	})

    .subscribedEventHandler('motionEventHandler', (context, event) => {
        
        this.logField(evt, {
        it == 'active' ? '1' : '0'
        })
        

	})

    .subscribedEventHandler('energyEventHandler', (context, event) => {
        
        this.logField(evt, {
        it.toString()
        })
        

	})

    .subscribedEventHandler('contactEventHandler', (context, event) => {
        
        this.logField(evt, {
        it == 'open' ? '1' : '0'
        })
        

	})

    .subscribedEventHandler('tstatFanModeEventHandler', (context, event) => {
        
        this.logField(evt, {
        it.toString()
        })
        

	})

    .subscribedEventHandler('tstatCoolSPEventHandler', (context, event) => {
        
        this.logField(evt, {
        it.toString()
        })
        

	})

    .subscribedEventHandler('illumEventHandler', (context, event) => {
        
        this.logField(evt, {
        it.toString()
        })
        

	})

    .subscribedEventHandler('switchEventHandler', (context, event) => {
        
        this.logField(evt, {
        it.toString()
        })
        

	})

    .subscribedEventHandler('powerEventHandler', (context, event) => {
        
        this.logField(evt, {
        it.toString()
        })
        

	})

    .subscribedEventHandler('batteryEventHandler', (context, event) => {
        
        this.logField(evt, {
        it.toString()
        })
        

	})

    .subscribedEventHandler('tstatFanStateEventHandler', (context, event) => {
        
        this.logField(evt, {
        it.toString()
        })
        

	})

    .subscribedEventHandler('presenceEventHandler', (context, event) => {
        
        this.logField(evt, {
        it.toString()
        })
        

	})

    .subscribedEventHandler('tstatHeatSPEventHandler', (context, event) => {
        
        this.logField(evt, {
        it.toString()
        })
        

	})

    .subscribedEventHandler('tempEventHandler', (context, event) => {
        
        this.logField(evt, {
        it.toString()
        })
        

	})

    .subscribedEventHandler('accelEventHandler', (context, event) => {
        
        this.logField(evt, {
        it == 'active' ? '1' : '0'
        })
        

	})
