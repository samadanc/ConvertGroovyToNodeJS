
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Allow control of these things...', section => {
            section.deviceSetting('switches').capability(['switch']).name('Which Switches?');
            section.deviceSetting('dimmers').capability(['switchLevel']).name('Which Dimmers?');
            section.deviceSetting('momentaries').capability(['momentary']).name('Which Momentary Switches?');
            section.deviceSetting('locks').capability(['lock']).name('Which Locks?');

        });


        page.section('View state of these things...', section => {
            section.deviceSetting('contacts').capability(['contactSensor']).name('Which Contact?');
            section.deviceSetting('presence').capability(['presenceSensor']).name('Which Presence?');
            section.deviceSetting('temperature').capability(['temperatureMeasurement']).name('Which Temperature?');
            section.deviceSetting('humidity').capability(['relativeHumidityMeasurement']).name('Which Hygrometer?');
            section.deviceSetting('motion').capability(['motionSensor']).name('Which Motion?');

        });


        page.section('Dashboard Preferences...', section => {
            section.booleanSetting('viewOnly').name('View Only');

        });


        page.section('Automatically refresh dashboard...', section => {
            section.textSetting('pusherAppId').name('Pusher Application ID');
            section.textSetting('pusherAppKey').name('Pusher Application Key');
            section.textSetting('pusherAppSecret').name('Pusher Application Secret');

        });


        page.section('Reset AOuth Access Token...', section => {
            section.booleanSetting('resetOauth').name('Reset AOuth Access Token?');

        });


        page.section('Send text message to...', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.motion, 'motionSensor', 'battery', 'handleEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.contacts, 'contactSensor', 'contact', 'handleEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.switches, 'switch', 'switch', 'handleEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.humidity, 'relativeHumidityMeasurement', 'humidity', 'handleEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.dimmers, 'switchLevel', 'level', 'handleEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.contacts, 'contactSensor', 'battery', 'handleEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.temperature, 'temperatureMeasurement', 'temperature', 'handleEvent')

        context.api.schedules.schedule('scheduledWeatherRefresh', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.locks, 'lock', 'lock', 'handleEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.locks, 'lock', 'battery', 'handleEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.motion, 'motionSensor', 'motion', 'handleEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.presence, 'presenceSensor', 'presence', 'handleEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.temperature, 'temperatureMeasurement', 'battery', 'handleEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.presence, 'presenceSensor', 'battery', 'handleEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.momentaries, 'momentary', 'momentary', 'handleEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.humidity, 'relativeHumidityMeasurement', 'battery', 'handleEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.dimmers, 'switchLevel', 'switch', 'handleEvent')

    })

    .subscribedEventHandler('handleEvent', (context, event) => {
        
        let data = ['id': event.deviceId, 'name': event.name, 'value': event.value]
        this.pusherPost('device_update', 'devices', data)
        

	})

    .scheduledEventHandler('scheduledWeatherRefresh', (context, event) => {
        
        console.log('Refreshing weather')
        let conditions = this.getWeatherFeature('conditions', weatherLocation)
        let astronomy = this.getWeatherFeature('astronomy', weatherLocation)
        state.weather = [:]
        state.weather.conditions = conditions.current_observation
        state.weather.astronomy = astronomy.moon_phase
        this.pusherPost('device_update', 'devices', ['id': 'weather', 'name': 'status', 'value': state.weather])
        

	})
