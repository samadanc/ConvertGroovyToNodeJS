
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Pick which devices home.ai will help you automate:', section => {
            section.deviceSetting('motion').capability(['motionSensor']).name('Choose motion sensors');
            section.deviceSetting('contact').capability(['contactSensor']).name('Choose contact sensors');
            section.deviceSetting('lightswitch').capability(['switch']).name('Choose normal power switches');
            section.deviceSetting('lightswitchlevel').capability(['switchLevel']).name('Choose dimmer power switches');
            section.deviceSetting('presence').capability(['presenceSensor']).name('Choose presence sensors');
            section.deviceSetting('tempSensor').capability(['temperatureMeasurement']).name('Choose temperature sensors');
            section.deviceSetting('waterSensor').capability(['waterSensor']).name('Choose water sensors');
            section.deviceSetting('humidity').capability(['relativeHumidityMeasurement']).name('Choose humidity sensors');
            section.deviceSetting('lock').capability(['lock']).name('Pick Door Locks');
            section.deviceSetting('garagedoor').capability(['garageDoorControl']).name('Pick garage doors');
            section.deviceSetting('touchsensor').capability(['touchSensor']).name('Pick touch sensors');
            section.deviceSetting('speechparser').capability(['speechRecognition']).name('Pick speech recognizers');
            section.deviceSetting('soundsensor').capability(['soundSensor']).name('Pick sound sensors');
            section.deviceSetting('smokedetector').capability(['smokeDetector']).name('Pick smoke detectors');
            section.deviceSetting('sleepsensor').capability(['sleepSensor']).name('Pick sleep sensors');
            section.deviceSetting('carbonsensor').capability(['carbonMonoxideDetector']).name('Pick carbon monoxide detectors');
            section.deviceSetting('button').capability(['button']).name('Pick buttons');
            section.deviceSetting('beacon').capability(['beacon']).name('Pick beacons');
            section.deviceSetting('alarm').capability(['alarm']).name('Pick alarms');
            section.deviceSetting('thermostat').capability(['thermostat']).name('Pick thermostats');
            section.deviceSetting('voltage').capability(['voltageMeasurement']).name('Pick voltage sensors');
            section.deviceSetting('windowshade').capability(['windowShade']).name('Pick window shades');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.thermostat, 'thermostat', 'thermostatFanMode', 'eventForwarder')

        await context.api.subscriptions.subscribeToDevices(context.config.touchsensor, 'touchSensor', 'touchsensor', 'eventForwarder')

        await context.api.subscriptions.subscribeToDevices(context.config.alarm, 'alarm', 'alarm', 'eventForwarder')

        await context.api.subscriptions.subscribeToDevices(context.config.button, 'button', 'button', 'eventForwarder')

        await context.api.subscriptions.subscribeToDevices(context.config.waterSensor, 'waterSensor', 'water', 'eventForwarder')

        await context.api.subscriptions.subscribeToDevices(context.config.presence, 'presenceSensor', 'presence', 'eventForwarder')

        await context.api.subscriptions.subscribeToDevices(context.config.humidity, 'relativeHumidityMeasurement', 'humidity', 'eventForwarder')

        await context.api.subscriptions.subscribeToDevices(context.config.thermostat, 'thermostat', 'thermostatSetpoint', 'eventForwarder')

        await context.api.subscriptions.subscribeToDevices(context.config.lock, 'lock', 'lock', 'eventForwarder')

        await context.api.subscriptions.subscribeToDevices(context.config.smokedetector, 'smokeDetector', 'smoke', 'eventForwarder')

        await context.api.subscriptions.subscribeToDevices(context.config.windowshade, 'windowShade', 'windowShade', 'eventForwarder')

        await context.api.subscriptions.subscribeToDevices(context.config.thermostat, 'thermostat', 'heatingSetpoint', 'eventForwarder')

        await context.api.subscriptions.subscribeToDevices(context.config.motion, 'motionSensor', 'motion', 'eventForwarder')

        await context.api.subscriptions.subscribeToDevices(context.config.contact, 'contactSensor', 'contact', 'eventForwarder')

        await context.api.subscriptions.subscribeToDevices(context.config.garagedoor, 'garageDoorControl', 'garagedoor', 'eventForwarder')

        await context.api.subscriptions.subscribeToDevices(context.config.tempSensor, 'temperatureMeasurement', 'temperature', 'eventForwarder')

        await context.api.subscriptions.subscribeToDevices(context.config.thermostat, 'thermostat', 'coolingSetpoint', 'eventForwarder')

        await context.api.subscriptions.subscribeToDevices(context.config.thermostat, 'thermostat', 'temperature', 'eventForwarder')

        await context.api.subscriptions.subscribeToDevices(context.config.thermostat, 'thermostat', 'thermostatOperatingState', 'eventForwarder')

        await context.api.subscriptions.subscribeToDevices(context.config.beacon, 'beacon', 'presence', 'eventForwarder')

        await context.api.subscriptions.subscribeToDevices(context.config.speechparser, 'speechRecognition', 'phraseSpoken', 'eventForwarder')

        await context.api.subscriptions.subscribeToDevices(context.config.carbonsensor, 'carbonMonoxideDetector', 'carbonMonoxide', 'eventForwarder')

        await context.api.subscriptions.subscribeToDevices(context.config.lightswitch, 'switch', 'switch', 'eventForwarder')

        await context.api.subscriptions.subscribeToDevices(context.config.soundsensor, 'soundSensor', 'sound', 'eventForwarder')

        await context.api.subscriptions.subscribeToDevices(context.config.voltage, 'voltageMeasurement', 'voltage', 'eventForwarder')

        await context.api.subscriptions.subscribeToDevices(context.config.sleepsensor, 'sleepSensor', 'sleeping', 'eventForwarder')

        await context.api.subscriptions.subscribeToDevices(context.config.thermostat, 'thermostat', 'thermostatMode', 'eventForwarder')

    })

    .subscribedEventHandler('eventForwarder', (context, event) => {
        
        let hubId = location.hubs.id[0]
        console.log(params.uri + ' ' + params.path)
        console.log('FORWARDING EVENT' + event.deviceId + ' ' + event.value + ' ' + hubId )
        let deviceId = event.deviceId
        let deviceState = event.value
        let params = ['uri': 'https://stage.app.home.ai', 'path': "/smartThingsPostback/stateChange/$hubId/$deviceId/$deviceState"]
        log.info(params)
        this.httpGet(params)
        

	})
