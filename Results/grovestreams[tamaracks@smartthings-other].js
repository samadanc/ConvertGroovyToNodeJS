
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Log devices...', section => {
            section.deviceSetting('temperatures').capability(['temperatureMeasurement']).name('Temperatures');
            section.deviceSetting('contacts').capability(['contactSensor']).name('Doors open/close');
            section.deviceSetting('accelerations').capability(['accelerationSensor']).name('Accelerations');
            section.deviceSetting('motions').capability(['motionSensor']).name('Motions');
            section.deviceSetting('presence').capability(['presenceSensor']).name('Presence');
            section.deviceSetting('switches').capability(['switch']).name('Switches');

        });


        page.section('GroveStreams Feed PUT API key...', section => {
            section.textSetting('channelKey').name('API key');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.temperatures, 'temperatureMeasurement', 'temperature', 'handleTemperatureEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.presence, 'presenceSensor', 'presence', 'handlePresenceEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.motions, 'motionSensor', 'motion', 'handleMotionEvent')

        context.api.schedules.runEvery5Minutes('processQueue', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.contacts, 'contactSensor', 'contact', 'handleContactEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.accelerations, 'accelerationSensor', 'acceleration', 'handleAccelerationEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.switches, 'switch', 'switch', 'handleSwitchEvent')

    })

    .subscribedEventHandler('handleContactEvent', (context, event) => {
        
        this.queueValue(evt, {
        it == 'open' ? 'true' : 'false'
        })
        

	})

    .subscribedEventHandler('handlePresenceEvent', (context, event) => {
        
        this.queueValue(evt, {
        it == 'present' ? 'true' : 'false'
        })
        

	})

    .subscribedEventHandler('handleTemperatureEvent', (context, event) => {
        
        this.queueValue(evt, {
        it.toString()
        })
        

	})

    .subscribedEventHandler('handleSwitchEvent', (context, event) => {
        
        this.queueValue(evt, {
        it == 'on' ? 'true' : 'false'
        })
        

	})

    .subscribedEventHandler('handleHumidityEvent', (context, event) => {
        
        this.queueValue(evt, {
        it.toString()
        })
        

	})

    .subscribedEventHandler('handleAccelerationEvent', (context, event) => {
        
        this.queueValue(evt, {
        it == 'active' ? 'true' : 'false'
        })
        

	})

    .subscribedEventHandler('handleMotionEvent', (context, event) => {
        
        this.queueValue(evt, {
        it == 'active' ? 'true' : 'false'
        })
        

	})

    .subscribedEventHandler('handleBatteryEvent', (context, event) => {
        
        this.queueValue(evt, {
        it.toString()
        })
        

	})

    .scheduledEventHandler('processQueue', (context, event) => {
        
        let url = "https://grovestreams.com/api/feed?api_key=$channelKey"
        console.log('processQueue')
        if (state.queue != []) {
        console.log("Events: ${state.queue}")
        try {
        this.httpPutJson(['uri': url , 'body': state.queue], { let response ->
        if (response.status != 200) {
        console.log("GroveStreams logging failed, status = ${response.status}")
        } else {
        console.log('GroveStreams accepted event(s)')
        state.queue = []
        state.queueCount = 0
        }
        })
        }
        catch (let e) {
        let errorInfo = "Error sending value: $e"
        log.error(errorInfo)
        }
        }
        

	})
