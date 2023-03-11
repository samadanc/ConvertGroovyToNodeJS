
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Power Meter', section => {
            section.deviceSetting('power').capability(['powerMeter']).name('Power Sensor');

        });


        page.section('Environment', section => {
            section.deviceSetting('thermOperatingStates').capability(['thermostat']).name('Therm Operating States');
            section.deviceSetting('temperatures').capability(['temperatureMeasurement']).name('Temperature Sensors');

        });


        page.section('Security', section => {
            section.deviceSetting('contacts').capability(['contactSensor']).name('Contact Sensors');
            section.deviceSetting('motions').capability(['motionSensor']).name('Motion Sensors');
            section.deviceSetting('locks').capability(['lock']).name('Locks');

        });


        page.section('Switches', section => {
            section.deviceSetting('switches').capability(['switch']).name('Switches');
            section.deviceSetting('dimmerSwitches').capability(['switchLevel']).name('Dimmer Switches');

        });


        page.section('Log Other Devices', section => {
            section.deviceSetting('acceleration').capability(['accelerationSensor']).name('Acceleration Sensors');
            section.deviceSetting('alarm').capability(['alarm']).name('Alarm');
            section.deviceSetting('batteries').capability(['battery']).name('Batteries');
            section.deviceSetting('beacon').capability(['beacon']).name('Beacon');
            section.deviceSetting('button').capability(['button']).name('Buttons');
            section.deviceSetting('colorControl').capability(['colorControl']).name('Color Control');
            section.deviceSetting('humidities').capability(['relativeHumidityMeasurement']).name('Humidity Sensors');
            section.deviceSetting('illuminances').capability(['illuminanceMeasurement']).name('Illuminance Sensors');
            section.deviceSetting('presenceSensors').capability(['presenceSensor']).name('Presence Sensors');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.humidities, 'relativeHumidityMeasurement', 'humidity', 'handleEnvironmentEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.colorControl, 'colorControl', 'Color Control', 'handleOtherEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.alarm, 'alarm', 'alarm', 'handleSecurityEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.power, 'powerMeter', 'power', 'handlePowerEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.motions, 'motionSensor', 'motion', 'handleSecurityEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.contacts, 'contactSensor', 'contact', 'handleSecurityEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.locks, 'lock', 'lock', 'handleSecurityEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.temperatures, 'temperatureMeasurement', 'temperature', 'handleEnvironmentEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.presenceSensors, 'presenceSensor', 'presence', 'handleOtherEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.illuminances, 'illuminanceMeasurement', 'illuminance', 'handleOtherEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.dimmerSwitches, 'switchLevel', 'switch', 'handleSwitchEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.switches, 'switch', 'switch', 'handleSwitchEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.beacon, 'beacon', 'beacon', 'handleOtherEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.thermOperatingStates, 'thermostat', 'thermostatOperatingState', 'handleEnvironmentEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.button, 'button', 'button', 'handleOtherEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.acceleration, 'accelerationSensor', 'acceleration', 'handleOtherEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.batteries, 'battery', 'battery', 'handleOtherEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.dimmerSwitches, 'switchLevel', 'level', 'handleSwitchEvent')

    })

    .subscribedEventHandler('handleOtherEvent', (context, event) => {
        
        this.sendEvent(evt, 'other')
        

	})

    .subscribedEventHandler('handlePowerEvent', (context, event) => {
        
        this.sendEvent(evt, 'power')
        

	})

    .subscribedEventHandler('handleEnvironmentEvent', (context, event) => {
        
        this.sendEvent(evt, 'environment')
        

	})

    .subscribedEventHandler('handleSwitchEvent', (context, event) => {
        
        this.sendEvent(evt, 'switch')
        

	})

    .subscribedEventHandler('handleSecurityEvent', (context, event) => {
        
        this.sendEvent(evt, 'security')
        

	})
