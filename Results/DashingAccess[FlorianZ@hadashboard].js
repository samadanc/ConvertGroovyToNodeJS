
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Allow access to the following things...', section => {
            section.deviceSetting('contacts').capability(['contactSensor']).name('Which contact sensors?');
            section.deviceSetting('locks').capability(['lock']).name('Which Locks?');
            section.deviceSetting('meters').capability(['powerMeter']).name('Which meters?');
            section.deviceSetting('motions').capability(['motionSensor']).name('Which motion sensors?');
            section.deviceSetting('presences').capability(['presenceSensor']).name('Which presence sensors?');
            section.deviceSetting('dimmers').capability(['switchLevel']).name('Which dimmers?');
            section.deviceSetting('switches').capability(['switch']).name('Which switches?');
            section.deviceSetting('temperatures').capability(['temperatureMeasurement']).name('Which temperature sensors?');
            section.deviceSetting('humidities').capability(['relativeHumidityMeasurement']).name('Which humidity sensors?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.presences, 'presenceSensor', 'presence', 'presenceHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.contacts, 'contactSensor', 'contact', 'contactHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.motions, 'motionSensor', 'motion', 'motionHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.humidities, 'relativeHumidityMeasurement', 'humidity', 'humidityHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.dimmers, 'switchLevel', 'switch', 'dimmerSwitch')

        await context.api.subscriptions.subscribeToDevices(context.config.locks, 'lock', 'lock', 'lockHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.switches, 'switch', 'switch', 'switchHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.temperatures, 'temperatureMeasurement', 'temperature', 'temperatureHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.meters, 'powerMeter', 'power', 'meterHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.dimmers, 'switchLevel', 'level', 'dimmerHandler')

    })

    .subscribedEventHandler('dimmerHandler', (context, event) => {
        
        let widgetId = state.widgets.dimmer[event.displayName]
        this.pause(1000)
        this.notifyWidget(widgetId, ['level': event.value])
        

	})

    .subscribedEventHandler('dimmerSwitch', (context, event) => {
        
        let whichDimmer = dimmers.find({
        it.displayName == event.displayName
        })
        let widgetId = state.widgets.dimmer[event.displayName]
        this.notifyWidget(widgetId, ['state': event.value])
        

	})

    .subscribedEventHandler('humidityHandler', (context, event) => {
        
        let widgetId = state.widgets.humidity[event.displayName]
        this.notifyWidget(widgetId, ['value': event.value])
        

	})

    .subscribedEventHandler('temperatureHandler', (context, event) => {
        
        let widgetId = state.widgets.temperature[event.displayName]
        this.notifyWidget(widgetId, ['value': event.value])
        

	})

    .subscribedEventHandler('switchHandler', (context, event) => {
        
        let widgetId = state.widgets.switch[event.displayName]
        this.notifyWidget(widgetId, ['state': event.value])
        

	})

    .subscribedEventHandler('presenceHandler', (context, event) => {
        
        let widgetId = state.widgets.presence[event.displayName]
        this.notifyWidget(widgetId, ['state': event.value])
        

	})

    .subscribedEventHandler('meterHandler', (context, event) => {
        
        let widgetId = state.widgets.power[event.displayName]
        this.notifyWidget(widgetId, ['value': event.value])
        

	})

    .subscribedEventHandler('contactHandler', (context, event) => {
        
        let widgetId = state.widgets.contact[event.displayName]
        this.notifyWidget(widgetId, ['state': event.value])
        

	})

    .subscribedEventHandler('lockHandler', (context, event) => {
        
        let widgetId = state.widgets.lock[event.displayName]
        this.notifyWidget(widgetId, ['state': event.value])
        

	})

    .subscribedEventHandler('motionHandler', (context, event) => {
        
        let widgetId = state.widgets.motion[event.displayName]
        this.notifyWidget(widgetId, ['state': event.value])
        

	})
