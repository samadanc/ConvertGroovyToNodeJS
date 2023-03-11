
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Log devices...', section => {
            section.deviceSetting('temperatures').capability(['temperatureMeasurement']).name('Temperatures');
            section.deviceSetting('humidities').capability(['relativeHumidityMeasurement']).name('Humidities');
            section.deviceSetting('thermostats').capability(['thermostat']).name('Thermostats');
            section.deviceSetting('contacts').capability(['contactSensor']).name('Doors open/close');
            section.deviceSetting('accelerations').capability(['accelerationSensor']).name('Accelerations');
            section.deviceSetting('motions').capability(['motionSensor']).name('Motions');
            section.deviceSetting('presence').capability(['presenceSensor']).name('Presence');
            section.deviceSetting('switches').capability(['switch']).name('Switches');
            section.deviceSetting('batteries').capability(['battery']).name('Batteries');

        });


        page.section('GroveStreams Feed PUT API key...', section => {
            section.textSetting('channelKey').name('API key');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.temperatures, 'temperatureMeasurement', 'temperature', 'handleTemperatureEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.thermostats, 'thermostat', 'thermostatOperatingState', 'handleThermostatOperatingStateEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.batteries, 'battery', 'battery', 'handleBatteryEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.presence, 'presenceSensor', 'presence', 'handlePresenceEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.motions, 'motionSensor', 'motion', 'handleMotionEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.accelerations, 'accelerationSensor', 'acceleration', 'handleAccelerationEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.humidities, 'relativeHumidityMeasurement', 'humidity', 'handleHumidityEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.contacts, 'contactSensor', 'contact', 'handleContactEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.switches, 'switch', 'switch', 'handleSwitchEvent')

        context.api.schedules.schedule('processQueue', delay);

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

    .subscribedEventHandler('handleThermostatOperatingStateEvent', (context, event) => {
        
        this.queueValue(evt, {
        it == 'idle' ? 'false' : 'true'
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
        
        console.log('Processing queue')
        let url = "https://grovestreams.com/api/feed?api_key=$channelKey"
        let header = ['X-Forwarded-For': location.id]
        if (atomicState.queue != null && atomicState.queue.size() > 0) {
        synchronized (atomicState.lock) {
        console.log("Events: ${atomicState.queue}")
        try {
        this.httpPutJson(['uri': url , 'header': header , 'body': atomicState.queue], { let response ->
        if (response.status != 200) {
        console.log("GroveStreams logging failed, status = ${response.status}")
        } else {
        console.log('GroveStreams accepted event(s)')
        atomicState.queue = []
        }
        })
        }
        catch (let e) {
        let errorInfo = "Error sending value: $e"
        log.error(errorInfo)
        if (e instanceof groovyx.net.http.ResponseParseException) {
        console.log('Simple parse error, events were still accepted.  Clearing queue')
        atomicState.queue = []
        }
        }
        }
        }
        

	})
