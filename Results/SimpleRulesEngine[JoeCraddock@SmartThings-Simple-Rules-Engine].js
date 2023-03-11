
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

        });


        page.section('allow it to get data from these things', section => {
            section.deviceSetting('presence').capability(['presenceSensor']).name('Which Presence?');
            section.deviceSetting('temperature').capability(['temperatureMeasurement']).name('Which Temperature?');
            section.deviceSetting('illuminance').capability(['illuminanceMeasurement']).name('Which Light Level?');
            section.deviceSetting('humidity').capability(['relativeHumidityMeasurement']).name('Which Hygrometer?');
            section.deviceSetting('motions').capability(['motionSensor']).name('Which Motion Sensors?');
            section.deviceSetting('contactSensors').capability(['contactSensor']).name('Which Contact Sensors?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.temperature, 'temperatureMeasurement', 'temperature', 'handler')

        await context.api.subscriptions.subscribeToDevices(context.config.motions, 'motionSensor', 'motion', 'handler')

        await context.api.subscriptions.subscribeToDevices(context.config.locks, 'lock', 'lock', 'handler')

        await context.api.subscriptions.subscribeToDevices(context.config.illuminance, 'illuminanceMeasurement', 'illuminance', 'handler')

        await context.api.subscriptions.subscribeToDevices(context.config.switches, 'switch', 'switch', 'handler')

        await context.api.subscriptions.subscribeToDevices(context.config.dimmers, 'switchLevel', 'switch', 'handler')

        await context.api.subscriptions.subscribeToDevices(context.config.humidity, 'relativeHumidityMeasurement', 'humidity', 'handler')

        await context.api.subscriptions.subscribeToDevices(context.config.presence, 'presenceSensor', 'presence', 'handler')

        await context.api.subscriptions.subscribeToDevices(context.config.dimmers, 'switchLevel', 'level', 'handler')

        await context.api.subscriptions.subscribeToDevices(context.config.contactSensors, 'contactSensor', 'contact', 'handler')

    })

    .subscribedEventHandler('handler', (context, event) => {
        
        log.trace("event happened ${event.description} - ${event.value}")
        let url = 'http://rulesengine.thesalthouse.co/EventHandler.ashx'
        this.httpPostJson(['uri': url , 'path': '', 'body': ['evt': ['deviceId': event.deviceId, 'name': event.name, 'value': event.value]]], {
        console.log('Event data successfully posted')
        })
        

	})
