
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Contact Sensors to Log', section => {
            section.deviceSetting('contacts').capability(['contactSensor']).name('Doors open/close');
            section.enumSetting('contactLogType').name('Values to log');

        });


        page.section('Motion Sensors to Log', section => {
            section.deviceSetting('motions').capability(['motionSensor']).name('Motion Sensors');
            section.enumSetting('motionLogType').name('Values to log');

        });


        page.section('Thermostat Settings', section => {
            section.deviceSetting('heatingSetPoints').capability(['thermostat']).name('Heating Setpoints');
            section.deviceSetting('coolingSetPoints').capability(['thermostat']).name('Cooling Setpoints');
            section.deviceSetting('thermOperatingStates').capability(['thermostat']).name('Operating States');

        });


        page.section('Locks to Log', section => {
            section.deviceSetting('locks').capability(['lock']).name('Locks');
            section.enumSetting('lockLogType').name('Values to log');

        });


        page.section('Log Other Devices', section => {
            section.deviceSetting('temperatures').capability(['temperatureMeasurement']).name('Temperatures');
            section.deviceSetting('humidities').capability(['relativeHumidityMeasurement']).name('Humidity Sensors');
            section.deviceSetting('illuminances').capability(['illuminanceMeasurement']).name('Illuminance Sensors');
            section.deviceSetting('presenceSensors').capability(['presenceSensor']).name('Presence Sensors');
            section.deviceSetting('switches').capability(['switch']).name('Switches');
            section.deviceSetting('dimmerSwitches').capability(['switchLevel']).name('Dimmer Switches');
            section.deviceSetting('energyMeters').capability(['energyMeter']).name('Energy Meters');
            section.deviceSetting('powerMeters').capability(['powerMeter']).name('Power Meters');
            section.deviceSetting('batteries').capability(['battery']).name('Batteries');
            section.deviceSetting('sensors').capability(['sensor']).name('Sensors');
            section.textSetting('sensorAttributes').name('Sensor Attributes (comma delimited)');

        });


        page.section('Google Sheets', section => {
            section.textSetting('urlKey').name('Script URL key');
            section.textSetting('appsDomain').name('Apps domainname');

        });


        page.section('Technical settings', section => {
            section.enumSetting('queueTime').name('Time to queue events before pushing to Google (in minutes)');
            section.enumSetting('resetVals').name('Reset the state values (queue, schedule, etc)');

        });


        page.section(''About'', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.sensors, 'sensor', 'it', 'handleStringEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.dimmerSwitches, 'switchLevel', 'switch', 'handleStringEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.presenceSensors, 'presenceSensor', 'presence', 'handleStringEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.illuminances, 'illuminanceMeasurement', 'illuminance', 'handleNumberEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.energyMeters, 'energyMeter', 'energy', 'handleNumberEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.locks, 'lock', 'lock', 'handleLockEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.motions, 'motionSensor', 'motion', 'handleMotionEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.contacts, 'contactSensor', 'contact', 'handleContactEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.temperatures, 'temperatureMeasurement', 'temperature', 'handleNumberEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.coolingSetPoints, 'thermostat', 'coolingSetpoint', 'handleNumberEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.heatingSetPoints, 'thermostat', 'heatingSetpoint', 'handleNumberEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.dimmerSwitches, 'switchLevel', 'level', 'handleNumberEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.batteries, 'battery', 'battery', 'handleNumberEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.switches, 'switch', 'switch', 'handleStringEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.humidities, 'relativeHumidityMeasurement', 'humidity', 'handleNumberEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.thermOperatingStates, 'thermostat', 'thermostatOperatingState', 'handleStringEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.powerMeters, 'powerMeter', 'power', 'handleNumberEvent')

    })

    .subscribedEventHandler('handleContactEvent', (context, event) => {
        
        let convertClosure = {
        it
        }
        if (contactLogType == 'true/false') {
        convertClosure = {
        it == 'open' ? 'true' : 'false'
        }
        } else {
        if (contactLogType == '1/0') {
        convertClosure = {
        it == 'open' ? '1' : '0'
        }
        }
        }
        if
        this.queueValue(evt, convertClosure)
        } else {
        this.sendValue(evt, convertClosure)
        }
        

	})

    .subscribedEventHandler('handleLockEvent', (context, event) => {
        
        let convertClosure = {
        it
        }
        if (lockLogType == 'true/false') {
        convertClosure = {
        it == 'locked' ? 'true' : 'false'
        }
        } else {
        if (lockLogType == '1/0') {
        convertClosure = {
        it == 'locked' ? '1' : '0'
        }
        }
        }
        if
        this.queueValue(evt, convertClosure)
        } else {
        this.sendValue(evt, convertClosure)
        }
        

	})

    .subscribedEventHandler('handleStringEvent', (context, event) => {
        
        console.log("handling string event $evt")
        if
        this.queueValue(evt, {
        it
        })
        } else {
        this.sendValue(evt, {
        it
        })
        }
        

	})

    .subscribedEventHandler('handleMotionEvent', (context, event) => {
        
        let convertClosure = {
        it
        }
        if (motionLogType == 'true/false') {
        convertClosure = {
        it == 'active' ? 'true' : 'false'
        }
        } else {
        if (motionLogType == '1/0') {
        convertClosure = {
        it == 'active' ? '1' : '0'
        }
        }
        }
        if
        this.queueValue(evt, convertClosure)
        } else {
        this.sendValue(evt, convertClosure)
        }
        

	})

    .subscribedEventHandler('handleNumberEvent', (context, event) => {
        
        if
        this.queueValue(evt, {
        it.toString()
        })
        } else {
        this.sendValue(evt, {
        it.toString()
        })
        }
        

	})
