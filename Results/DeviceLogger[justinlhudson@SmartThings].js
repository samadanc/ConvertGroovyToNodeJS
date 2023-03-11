
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Log devices...', section => {
            section.deviceSetting('presences').capability(['presenceSensor']).name('Presence');
            section.deviceSetting('powers').capability(['powerMeter']).name('Power');
            section.deviceSetting('energies').capability(['energyMeter']).name('Energy');
            section.deviceSetting('contacts').capability(['contactSensor']).name('Contact');
            section.deviceSetting('switches').capability(['switch']).name('Switch');
            section.deviceSetting('motions').capability(['motionSensor']).name('Motion');
            section.deviceSetting('batteries').capability(['battery']).name('Battery');
            section.deviceSetting('temperatures').capability(['temperatureMeasurement']).name('Temperature');
            section.deviceSetting('thermostats').capability(['thermostat']).name('Thermostat');
            section.deviceSetting('humidities').capability(['relativeHumidityMeasurement']).name('Humidity');
            section.deviceSetting('illuminances').capability(['illuminanceMeasurement']).name('Illuminance');
            section.deviceSetting('waters').capability(['waterSensor']).name('Water');
            section.deviceSetting('valves').capability(['valve']).name('Valve');
            section.deviceSetting('detectors').capability(['smokeDetector']).name('Detectors');

        });


        page.section('API (GET request query', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.valves, 'valve', 'contact', 'valveHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.presences, 'presenceSensor', 'presence', 'presenceHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.contacts, 'contactSensor', 'contact', 'contactHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.energies, 'energyMeter', 'energy', 'energyHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.detectors, 'smokeDetector', 'smoke', 'detectorHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.motions, 'motionSensor', 'motion', 'motionHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.humidities, 'relativeHumidityMeasurement', 'humidity', 'humidityHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.detectors, 'smokeDetector', 'carbonMonoxide', 'detectorHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.thermostats, 'thermostat', 'thermostatOperatingState', 'thermostatHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.illuminances, 'illuminanceMeasurement', 'illuminance', 'illuminanceHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.switches, 'switch', 'switch', 'switchHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.waters, 'waterSensor', 'water', 'waterHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.batteries, 'battery', 'battery', 'batteryHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.temperatures, 'temperatureMeasurement', 'temperature', 'temperatureHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.powers, 'powerMeter', 'power', 'powerHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'routineExecuted', 'routineHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'mode', 'modeHandler')

    })

    .subscribedEventHandler('valveHandler', (context, event) => {
        
        this.logField('valve', evt, {
        it == 'open' ? '1' : '0'
        })
        

	})

    .subscribedEventHandler('powerHandler', (context, event) => {
        
        this.logField('power', evt, {
        it.toString()
        })
        

	})

    .subscribedEventHandler('waterHandler', (context, event) => {
        
        this.logField('water', evt, {
        it == 'wet' ? '1' : '0'
        })
        

	})

    .subscribedEventHandler('humidityHandler', (context, event) => {
        
        this.logField('humidity', evt, {
        it.toString()
        })
        

	})

    .subscribedEventHandler('thermostatHandler', (context, event) => {
        
        this.logField('thermostat', evt, {
        it == 'heating' ? 1 : 0 || it == 'cooling' ? 1 : 0.toString()
        })
        

	})

    .subscribedEventHandler('detectorHandler', (context, event) => {
        
        this.logField('detector', evt, {
        it == 'detected' ? '1' : '0'
        })
        

	})

    .subscribedEventHandler('temperatureHandler', (context, event) => {
        
        this.logField('temperature', evt, {
        it.toString()
        })
        

	})

    .subscribedEventHandler('switchHandler', (context, event) => {
        
        this.logField('switch', evt, {
        it == 'on' ? '1' : '0'
        })
        

	})

    .subscribedEventHandler('illuminanceHandler', (context, event) => {
        
        this.logField('illuminance', evt, {
        it.toString()
        })
        

	})

    .subscribedEventHandler('presenceHandler', (context, event) => {
        
        this.logField('presence', evt, {
        it == 'present' ? 1 : 0.toString()
        })
        

	})

    .subscribedEventHandler('modeHandler', (context, event) => {
        
        this.logField('mode', evt, {
        1
        })
        

	})

    .subscribedEventHandler('routineHandler', (context, event) => {
        
        this.logField('routine', evt, {
        1
        })
        

	})

    .subscribedEventHandler('contactHandler', (context, event) => {
        
        this.logField('contact', evt, {
        it == 'open' ? '1' : '0'
        })
        

	})

    .subscribedEventHandler('batteryHandler', (context, event) => {
        
        this.logField('battery', evt, {
        it.toString()
        })
        

	})

    .subscribedEventHandler('energyHandler', (context, event) => {
        
        this.logField('energy', evt, {
        it.toString()
        })
        

	})

    .subscribedEventHandler('motionHandler', (context, event) => {
        
        this.logField('motion', evt, {
        it == 'active' ? '1' : '0'
        })
        

	})
