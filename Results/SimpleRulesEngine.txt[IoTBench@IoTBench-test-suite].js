
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Allow External Service to Control These Things...', section => {
            section.deviceSetting('switches').capability(['switch']).name('Which Switches?');
            section.deviceSetting('dimmers').capability(['switchLevel']).name('Which Dimmers?');
            section.deviceSetting('locks').capability(['lock']).name('Which Locks?');
            section.deviceSetting('thermostats').capability(['thermostat']).name('Which Thermostats?');
            section.deviceSetting('alarms').capability(['alarm']).name('Which Alarms?');
            section.deviceSetting('doorControls').capability(['doorControl']).name('Which Doors?');

        });


        page.section('allow it to get data from these things', section => {
            section.deviceSetting('presence').capability(['presenceSensor']).name('Which Presence?');
            section.deviceSetting('temperature').capability(['temperatureMeasurement']).name('Which Temperature?');
            section.deviceSetting('illuminance').capability(['illuminanceMeasurement']).name('Which Light Level?');
            section.deviceSetting('humidity').capability(['relativeHumidityMeasurement']).name('Which Hygrometer?');
            section.deviceSetting('motions').capability(['motionSensor']).name('Which Motion Sensors?');
            section.deviceSetting('contactSensors').capability(['contactSensor']).name('Which Contact Sensors?');
            section.deviceSetting('buttonDevices').capability(['button']).name('Which Buttons?');
            section.deviceSetting('waterSensors').capability(['waterSensor']).name('Which Water Sensors?');
            section.deviceSetting('carbonMonoxideDetectors').capability(['carbonMonoxideDetector']).name('Which Carbon Monoxide Detectors?');
            section.deviceSetting('smokeDetectors').capability(['smokeDetector']).name('Which Smoke Detectors?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.temperature, 'temperatureMeasurement', 'temperature', 'handler')

        await context.api.subscriptions.subscribeToDevices(context.config.motions, 'motionSensor', 'motion', 'handler')

        await context.api.subscriptions.subscribeToDevices(context.config.alarms, 'alarm', 'alarm', 'handler')

        await context.api.subscriptions.subscribeToDevices(context.config.locks, 'lock', 'lock', 'handler')

        await context.api.subscriptions.subscribeToDevices(context.config.illuminance, 'illuminanceMeasurement', 'illuminance', 'handler')

        await context.api.subscriptions.subscribeToDevices(context.config.switches, 'switch', 'switch', 'handler')

        await context.api.subscriptions.subscribeToDevices(context.config.dimmers, 'switchLevel', 'switch', 'handler')

        await context.api.subscriptions.subscribeToDevices(context.config.waterSensors, 'waterSensor', 'waterSensor', 'handler')

        await context.api.subscriptions.subscribeToDevices(context.config.humidity, 'relativeHumidityMeasurement', 'humidity', 'handler')

        await context.api.subscriptions.subscribeToDevices(context.config.presence, 'presenceSensor', 'presence', 'handler')

        await context.api.subscriptions.subscribeToDevices(context.config.smokeDetectors, 'smokeDetector', 'smokeDetector', 'handler')

        await context.api.subscriptions.subscribeToDevices(context.config.doorControls, 'doorControl', 'doorControl', 'handler')

        await context.api.subscriptions.subscribeToDevices(context.config.dimmers, 'switchLevel', 'level', 'handler')

        await context.api.subscriptions.subscribeToDevices(context.config.contactSensors, 'contactSensor', 'contact', 'handler')

        await context.api.subscriptions.subscribeToDevices(context.config.carbonMonoxideDetectors, 'carbonMonoxideDetector', 'carbonMonoxideDetector', 'handler')

        await context.api.subscriptions.subscribeToDevices(context.config.buttonDevices, 'button', 'button', 'buttonDevicehandler')

    })

    .subscribedEventHandler('handler', (context, event) => {
        
        console.log("event happened ${event.description} - ${event.value}")
        let url = 'http://rulesengine.thesalthouse.co/EventHandler.ashx'
        this.httpPostJson(['uri': url , 'path': '', 'body': ['evt': ['deviceId': event.deviceId, 'name': event.name, 'value': event.value]]], {
        console.log('Event data successfully posted')
        })
        

	})

    .subscribedEventHandler('buttonDevicehandler', (context, event) => {
        
        let parsedEventData = new JsonSlurper().parseText(event.data)
        console.log("${event.name} ${parsedEventData.buttonNumber} - ${event.value}")
        let data = ['evt': ['deviceId': event.deviceId, 'name': event.name, 'value': event.value, 'buttonIndex': parsedEventData.buttonNumber]]
        this.postData(data)
        

	})
