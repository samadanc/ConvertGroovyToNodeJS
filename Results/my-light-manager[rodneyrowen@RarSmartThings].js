
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Control these lights...', section => {
            section.deviceSetting('lights').capability(['switch']).name('');

        });


        page.section('Set Normal Dim Level...', section => {
            section.numberSetting('dimLevel').name('Dim Level?');

        });


        page.section('Turning bright when it\'s dark and this happens...', section => {
            section.deviceSetting('closeSensors').capability(['contactSensor']).name('Sensor Closes');
            section.deviceSetting('openSensors').capability(['contactSensor']).name('Sensor Opens');
            section.deviceSetting('motionSensors').capability(['motionSensor']).name('Motion Sensors');

        });


        page.section('And then off when it\'s light or there\'s been no change for...', section => {
            section.numberSetting('delayMinutes').name('Minutes?');

        });


        page.section('Using either on this light sensor (optional) or the local sunrise and sunset', section => {
            section.deviceSetting('lightSensor').capability(['illuminanceMeasurement']).name('');
            section.numberSetting('luxLevel').name('Lux level?');

        });


        page.section('Sunrise offset (optional)...', section => {
            section.textSetting('sunriseOffsetValue').name('HH:MM');
            section.enumSetting('sunriseOffsetDir').name('Before or After');

        });


        page.section('Sunset offset (optional)...', section => {
            section.textSetting('sunsetOffsetValue').name('HH:MM');
            section.enumSetting('sunsetOffsetDir').name('Before or After');

        });


        page.section('Zip code (optional, defaults to location coordinates when location services are enabled)...', section => {
            section.textSetting('zipCode').name('Zip code');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.lightSensor, 'illuminanceMeasurement', 'illuminance', 'illuminanceHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.closeSensors, 'contactSensor', 'contact.closed', 'closedHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.motionSensors, 'motionSensor', 'motion.inactive', 'inactiveHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunsetTime', 'sunriseSunsetTimeHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.openSensors, 'contactSensor', 'contact.open', 'openedHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunriseTime', 'sunriseSunsetTimeHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'position', 'locationPositionChange')

        await context.api.subscriptions.subscribeToDevices(context.config.motionSensors, 'motionSensor', 'motion.active', 'activeHandler')

    })

    .subscribedEventHandler('openedHandler', (context, event) => {
        
        console.log("${event.name}: ${event.value}")
        if (event.value == 'open') {
        console.log('Got Open Sensor event')
        this.eventHandler()
        }
        

	})

    .subscribedEventHandler('locationPositionChange', (context, event) => {
        
        log.trace('locationChange()')
        this.astroCheck()
        

	})

    .subscribedEventHandler('closedHandler', (context, event) => {
        
        console.log("${event.name}: ${event.value}")
        if (event.value == 'closed') {
        console.log('Got Close Sensor event')
        this.eventHandler()
        }
        

	})

    .subscribedEventHandler('illuminanceHandler', (context, event) => {
        
        console.log("${event.name}: ${event.value}, lastStatus: ${state.lastStatus}, motionStopTime: ${state.motionStopTime}")
        this.processState()
        

	})

    .subscribedEventHandler('activeHandler', (context, event) => {
        
        log.trace("motion active fired via [${event.displayName}] UTC: ${event.date.format(yyyy-MM-dd HH:mm:ss)}")
        this.eventHandler()
        

	})

    .subscribedEventHandler('inactiveHandler', (context, event) => {
        
        console.log('Got Motion inactive event')
        

	})

    .subscribedEventHandler('sunriseSunsetTimeHandler', (context, event) => {
        
        state.lastSunriseSunsetEvent = this.now()
        console.log("SmartNightlight.sunriseSunsetTimeHandler(${app.id})")
        this.astroCheck()
        

	})
