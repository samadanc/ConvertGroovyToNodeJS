
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Allow SmartDash to control these things...', section => {
            section.deviceSetting('switches').capability(['switch']).name('Which Switches?');
            section.deviceSetting('motionSensors').capability(['motionSensor']).name('Which Motion Sensors?');
            section.deviceSetting('contactSensors').capability(['contactSensor']).name('Which Contact Sensors?');
            section.deviceSetting('presenceSensors').capability(['presenceSensor']).name('Which Presence Sensors?');
            section.deviceSetting('temperatureSensors').capability(['temperatureMeasurement']).name('Which Temperature Sensors?');
            section.deviceSetting('accelerationSensors').capability(['accelerationSensor']).name('Which Vibration Sensors?');
            section.deviceSetting('locks').capability(['lock']).name('Which Locks?');
            section.deviceSetting('threeAxis').capability(['threeAxis']).name('Which 3 Axis Sensors?');
            section.deviceSetting('thermostats').capability(['thermostat']).name('Which Thermostats?');
            section.deviceSetting('energyMeters').capability(['energyMeter']).name('Which Energy Meters?');
            section.deviceSetting('powerMeters').capability(['powerMeter']).name('Which Power Meters?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.switches, 'switch', 'switch', 'switchEventHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.thermostats, 'thermostat', 'thermostat', 'thermostatEventHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.accelerationSensors, 'accelerationSensor', 'acceleration', 'accelerationEventHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.presenceSensors, 'presenceSensor', 'presence', 'presenceEventHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.energyMeters, 'energyMeter', 'energy', 'energyEventHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.motionSensors, 'motionSensor', 'motion', 'motionEventHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.threeAxis, 'threeAxis', 'threeAxis', 'threeAxisEventHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.contactSensors, 'contactSensor', 'contact', 'contactEventHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.temperatureSensors, 'temperatureMeasurement', 'temperature', 'temperatureEventHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.locks, 'lock', 'lock', 'lockEventHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.powerMeters, 'powerMeter', 'power', 'powerEventHandler')

    })

    .subscribedEventHandler('presenceEventHandler', (context, event) => {
        
        this.LOG('presenceEventHandler()')
        this.sendPostEvent('presenceSensors', 'presence', evt)
        

	})

    .subscribedEventHandler('switchEventHandler', (context, event) => {
        
        this.LOG('switchEventHandler()')
        this.sendPostEvent('switches', 'switch', evt)
        

	})

    .subscribedEventHandler('motionEventHandler', (context, event) => {
        
        this.LOG('motionEventHandler()')
        this.sendPostEvent('motionSensors', 'motion', evt)
        

	})

    .subscribedEventHandler('energyEventHandler', (context, event) => {
        
        this.LOG('energyEventHandler()')
        this.sendPostEvent('energyMeters', 'energy', evt)
        

	})

    .subscribedEventHandler('lockEventHandler', (context, event) => {
        
        this.LOG('lockEventHandler()')
        this.sendPostEvent('locks', 'lock', evt)
        

	})

    .subscribedEventHandler('powerEventHandler', (context, event) => {
        
        this.LOG('powerEventHandler()')
        this.sendPostEvent('powerMeters', 'power', evt)
        

	})

    .subscribedEventHandler('threeAxisEventHandler', (context, event) => {
        
        this.LOG('threeAxisEventHandler()')
        this.sendPostEventOrientation('threeAxis', 'threeAxis', evt)
        

	})

    .subscribedEventHandler('accelerationEventHandler', (context, event) => {
        
        this.LOG('accelerationEventHandler()')
        this.sendPostEvent('accelerationSensors', 'acceleration', evt)
        

	})

    .subscribedEventHandler('contactEventHandler', (context, event) => {
        
        this.LOG('contactEventHandler()')
        this.sendPostEvent('contactSensors', 'contact', evt)
        

	})

    .subscribedEventHandler('temperatureEventHandler', (context, event) => {
        
        this.LOG('temperatureEventHandler()')
        this.sendPostEvent('temperatureSensors', 'temperature', evt)
        

	})

    .subscribedEventHandler('thermostatEventHandler', (context, event) => {
        
        this.LOG('thermostatEventHandler()')
        this.sendPostEvent('thermostats', 'thermostat', evt)
        

	})
