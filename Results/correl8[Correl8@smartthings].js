
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Log devices...', section => {
            section.deviceSetting('accelerations').capability(['accelerationSensor']).name('Accelerations');
            section.deviceSetting('airqualitysensors').capability(['airQualitySensor']).name('Air quality sensors');
            section.deviceSetting('alarms').capability(['alarm']).name('Alarms');
            section.deviceSetting('batteries').capability(['battery']).name('Batteries');
            section.deviceSetting('buttons').capability(['button']).name('Buttons');
            section.deviceSetting('co2measurements').capability(['carbonDioxideMeasurement']).name('CO2 measurements');
            section.deviceSetting('codetectors').capability(['carbonMonoxideDetector']).name('CO detectors');
            section.deviceSetting('comeasurements').capability(['carbonMonoxideMeasurement']).name('CO measurements');
            section.deviceSetting('colorcontrols').capability(['colorControl']).name('Color controls');
            section.deviceSetting('colortemperatures').capability(['colorTemperature']).name('Color temperatures');
            section.deviceSetting('contacts').capability(['contactSensor']).name('Doors/windows');
            section.deviceSetting('doorcontrols').capability(['doorControl']).name('Door controls');
            section.deviceSetting('energies').capability(['energyMeter']).name('Energy Meters');
            section.deviceSetting('illuminances').capability(['illuminanceMeasurement']).name('Illuminances');
            section.deviceSetting('infrareds').capability(['infraredLevel']).name('Infrared levels');
            section.deviceSetting('locks').capability(['lock']).name('Locks');
            section.deviceSetting('motions').capability(['motionSensor']).name('Motions');
            section.deviceSetting('powermeters').capability(['powerMeter']).name('Power Meters');
            section.deviceSetting('powersources').capability(['powerSource']).name('Power Sources');
            section.deviceSetting('presences').capability(['presenceSensor']).name('Presence Sensors');
            section.deviceSetting('humidities').capability(['relativeHumidityMeasurement']).name('Humidities');
            section.deviceSetting('signalstrengths').capability(['signalStrength']).name('Signal strengths');
            section.deviceSetting('smokedetectors').capability(['smokeDetector']).name('Smoke detectors');
            section.deviceSetting('soundSensors').capability(['soundSensor']).name('Sound sensors');
            section.deviceSetting('switchlevels').capability(['switchLevel']).name('Switch levels');
            section.deviceSetting('switches').capability(['switch']).name('Switches');
            section.deviceSetting('tamperalerts').capability(['tamperAlert']).name('Tamper alerts');
            section.deviceSetting('temperatures').capability(['temperatureMeasurement']).name('Temperatures');
            section.deviceSetting('thermostatcoolingsetpoints').capability(['thermostatCoolingSetpoint']).name('Thermostat cooling setpoints');
            section.deviceSetting('thermostatfanmodes').capability(['thermostatFanMode']).name('Thermostat fan modes');
            section.deviceSetting('thermostatheatingsetpoints').capability(['thermostatHeatingSetpoint']).name('Thermostat heating setpoints');
            section.deviceSetting('thermostatmodes').capability(['thermostatMode']).name('Thermostat modes');
            section.deviceSetting('thermostatoperatingstates').capability(['thermostatOperatingState']).name('Thermostat operating states');
            section.deviceSetting('thermostatsetpoints').capability(['thermostatSetpoint']).name('Thermostat setpoints');
            section.deviceSetting('ultravioletindexes').capability(['ultravioletIndex']).name('Ultraviolet indexes');
            section.deviceSetting('valves').capability(['valve']).name('Valves');
            section.deviceSetting('voltages').capability(['voltageMeasurement']).name('Voltages');
            section.deviceSetting('waterSensors').capability(['waterSensor']).name('Water sensors');

        });


        page.section('Correl8 API key...', section => {
            section.textSetting('apiKey').name('API key');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.thermostatoperatingstates, 'thermostatOperatingState', 'thermostatOperatingState', 'handleString')

        await context.api.subscriptions.subscribeToDevices(context.config.thermostatheatingsetpoints, 'thermostatHeatingSetpoint', 'heatingSetpoint', 'handleFloat')

        await context.api.subscriptions.subscribeToDevices(context.config.colorcontrols, 'colorControl', 'hue', 'handleInteger')

        await context.api.subscriptions.subscribeToDevices(context.config.colortemperatures, 'colorTemperature', 'colorTemperature', 'handleInteger')

        await context.api.subscriptions.subscribeToDevices(context.config.locks, 'lock', 'lock', 'handleLockEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.motions, 'motionSensor', 'motion', 'handleMotionEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.colorcontrols, 'colorControl', 'saturation', 'handleInteger')

        await context.api.subscriptions.subscribeToDevices(context.config.signalstrengths, 'signalStrength', 'lqi', 'handleInteger')

        await context.api.subscriptions.subscribeToDevices(context.config.alarms, 'alarm', 'alarm', 'handleString')

        await context.api.subscriptions.subscribeToDevices(context.config.co2measurements, 'carbonDioxideMeasurement', 'carbonDioxide', 'handleInteger')

        await context.api.subscriptions.subscribeToDevices(context.config.signalstrengths, 'signalStrength', 'rssi', 'handleFloat')

        await context.api.subscriptions.subscribeToDevices(context.config.thermostatcoolingsetpoints, 'thermostatCoolingSetpoint', 'coolingSetpoint', 'handleFloat')

        await context.api.subscriptions.subscribeToDevices(context.config.buttons, 'button', 'button', 'handleString')

        await context.api.subscriptions.subscribeToDevices(context.config.accelerations, 'accelerationSensor', 'acceleration', 'handleAccelerationEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.infrareds, 'infraredLevel', 'infraredLevel', 'handleFloat')

        await context.api.subscriptions.subscribeToDevices(context.config.energies, 'energyMeter', 'energy', 'handleFloat')

        await context.api.subscriptions.subscribeToDevices(context.config.powersources, 'powerSource', 'power', 'handleString')

        await context.api.subscriptions.subscribeToDevices(context.config.thermostatsetpoints, 'thermostatSetpoint', 'thermostatSetpoint', 'handleFloat')

        await context.api.subscriptions.subscribeToDevices(context.config.batteries, 'battery', 'battery', 'handleFloat')

        await context.api.subscriptions.subscribeToDevices(context.config.doorcontrols, 'doorControl', 'door', 'handleString')

        await context.api.subscriptions.subscribeToDevices(context.config.humidities, 'relativeHumidityMeasurement', 'humidity', 'handleFloat')

        await context.api.subscriptions.subscribeToDevices(context.config.temperatures, 'temperatureMeasurement', 'temperature', 'handleFloat')

        await context.api.subscriptions.subscribeToDevices(context.config.tamperalerts, 'tamperAlert', 'tamper', 'handleDetected')

        await context.api.subscriptions.subscribeToDevices(context.config.ultravioletindexes, 'ultravioletIndex', 'ultravioletIndex', 'handleFloat')

        await context.api.subscriptions.subscribeToDevices(context.config.switches, 'switch', 'switch', 'handleSwitchEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.illuminances, 'illuminanceMeasurement', 'illuminance', 'handleFloat')

        await context.api.subscriptions.subscribeToDevices(context.config.codetectors, 'carbonMonoxideDetector', 'carbonMonoxide', 'handleDetected')

        await context.api.subscriptions.subscribeToDevices(context.config.voltages, 'voltageMeasurement', 'voltage', 'handleFloat')

        await context.api.subscriptions.subscribeToDevices(context.config.presences, 'presenceSensor', 'presence', 'handlePresenceEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.powermeters, 'powerMeter', 'power', 'handleFloat')

        await context.api.subscriptions.subscribeToDevices(context.config.smokedetectors, 'smokeDetector', 'smoke', 'handleDetected')

        await context.api.subscriptions.subscribeToDevices(context.config.thermostatfanmodes, 'thermostatFanMode', 'thermostatFanMode', 'handleString')

        await context.api.subscriptions.subscribeToDevices(context.config.valves, 'valve', 'valve', 'handleContactEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.comeasurements, 'carbonMonoxideMeasurement', 'carbonMonoxideLevel', 'handleFloat')

        await context.api.subscriptions.subscribeToDevices(context.config.contacts, 'contactSensor', 'contact', 'handleContactEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.airqualitysensors, 'airQualitySensor', 'airQuality', 'handleInteger')

        await context.api.subscriptions.subscribeToDevices(context.config.thermostatmodes, 'thermostatMode', 'thermostatMode', 'handleString')

        await context.api.subscriptions.subscribeToDevices(context.config.waterSensors, 'waterSensor', 'water', 'handleWaterEvent')

    })

    .subscribedEventHandler('handleDetected', (context, event) => {
        
        this.sendEvent(['name': event.name, 'value': event.value, 'descriptionText': "${event.displayName}: ${event.name}=${event.value}", 'data': evt , 'eventType': 'SMART_APP_EVENT', 'displayed': false])
        let e = ['sensor': event.displayName.trim(), 'name': 'detected', 'value': event.value == 'detected' ? true : false]
        this.sendValue(e)
        

	})

    .subscribedEventHandler('handleContactEvent', (context, event) => {
        
        this.sendEvent(['name': event.name, 'value': event.value, 'descriptionText': "${event.displayName}: ${event.name}=${event.value}", 'data': evt , 'eventType': 'SMART_APP_EVENT', 'displayed': false])
        let e = ['sensor': event.displayName.trim(), 'name': 'open', 'value': event.value == 'open' ? true : false]
        this.sendValue(e)
        

	})

    .subscribedEventHandler('handlePresenceEvent', (context, event) => {
        
        this.sendEvent(['name': event.name, 'value': event.value, 'descriptionText': "${event.displayName}: ${event.name}=${event.value}", 'data': evt , 'eventType': 'SMART_APP_EVENT', 'displayed': false])
        let e = ['sensor': event.displayName.trim(), 'name': event.name, 'value': event.value == 'present' ? true : false]
        this.sendValue(e)
        

	})

    .subscribedEventHandler('handleFloat', (context, event) => {
        
        this.sendEvent(['name': event.name, 'value': event.value, 'descriptionText': "${event.displayName}: ${event.name}=${event.value}", 'data': evt , 'eventType': 'SMART_APP_EVENT', 'displayed': false])
        let e = ['sensor': event.displayName.trim(), 'name': event.name, 'value': Float.parseFloat(event.value)]
        this.sendValue(e)
        

	})

    .subscribedEventHandler('handleInteger', (context, event) => {
        
        this.sendEvent(['name': event.name, 'value': event.value, 'descriptionText': "${event.displayName}: ${event.name}=${event.value}", 'data': evt , 'eventType': 'SMART_APP_EVENT', 'displayed': false])
        let e = ['sensor': event.displayName.trim(), 'name': event.name, 'value': Integer.parseInt(event.value)]
        this.sendValue(e)
        

	})

    .subscribedEventHandler('handleMotionEvent', (context, event) => {
        
        this.sendEvent(['name': event.name, 'value': event.value, 'descriptionText': "${event.displayName}: ${event.name}=${event.value}", 'data': evt , 'eventType': 'SMART_APP_EVENT', 'displayed': false])
        let e = ['sensor': event.displayName.trim(), 'name': event.name, 'value': event.value == 'active' ? true : false]
        this.sendValue(e)
        

	})

    .subscribedEventHandler('handleAccelerationEvent', (context, event) => {
        
        this.sendEvent(['name': event.name, 'value': event.value, 'descriptionText': "${event.displayName}: ${event.name}=${event.value}", 'data': evt , 'eventType': 'SMART_APP_EVENT', 'displayed': false])
        let e = ['sensor': event.displayName.trim(), 'name': event.name, 'value': event.value == 'active' ? true : false]
        this.sendValue(e)
        

	})

    .subscribedEventHandler('handleString', (context, event) => {
        
        this.sendEvent(['name': event.name, 'value': event.value, 'descriptionText': "${event.displayName}: ${event.name}=${event.value}", 'data': evt , 'eventType': 'SMART_APP_EVENT', 'displayed': false])
        let e = ['sensor': event.displayName.trim(), 'name': event.name, 'value': event.value.trim()]
        this.sendValue(e)
        

	})

    .subscribedEventHandler('handleLockEvent', (context, event) => {
        
        this.sendEvent(['name': event.name, 'value': event.value, 'descriptionText': "${event.displayName}: ${event.name}=${event.value}", 'data': evt , 'eventType': 'SMART_APP_EVENT', 'displayed': false])
        let e = ['sensor': event.displayName.trim(), 'name': 'locked', 'value': event.value == 'locked' ? true : false]
        this.sendValue(e)
        

	})

    .subscribedEventHandler('handleSwitchEvent', (context, event) => {
        
        this.sendEvent(['name': event.name, 'value': event.value, 'descriptionText': "${event.displayName}: ${event.name}=${event.value}", 'data': evt , 'eventType': 'SMART_APP_EVENT', 'displayed': false])
        let e = ['sensor': event.displayName.trim(), 'name': event.name, 'value': event.value == 'on' ? true : false]
        this.sendValue(e)
        

	})

    .subscribedEventHandler('handleWaterEvent', (context, event) => {
        
        this.sendEvent(['name': event.name, 'value': event.value, 'descriptionText': "${event.displayName}: ${event.name}=${event.value}", 'data': evt , 'eventType': 'SMART_APP_EVENT', 'displayed': false])
        let e = ['sensor': event.displayName.trim(), 'name': 'wet', 'value': event.value == 'wet' ? true : false]
        this.sendValue(e)
        

	})
