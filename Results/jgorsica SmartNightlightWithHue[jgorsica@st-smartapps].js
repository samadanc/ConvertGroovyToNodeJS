
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Control these lights...', section => {
            section.deviceSetting('lights').capability(['switch']).name('');

        });


        page.section('And control these color bulbs...', section => {
            section.deviceSetting('hues').capability(['colorControl']).name('Which Hue Bulbs?');

        });


        page.section('Choose light effects...', section => {
            section.enumSetting('color').name('Hue Color?');
            section.enumSetting('lightLevel').name('Light Level?');

        });


        page.section('Turning on when it\'s dark and there\'s movement...', section => {
            section.deviceSetting('motionSensor').capability(['motionSensor']).name('Where?');

        });


        page.section('And then off when it\'s light or there\'s been no movement for...', section => {
            section.numberSetting('delayMinutes').name('Minutes?');

        });


        page.section('Using either on this light sensor (optional) or the local sunrise and sunset', section => {
            section.deviceSetting('lightSensor').capability(['illuminanceMeasurement']).name('');

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

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunsetTime', 'sunriseSunsetTimeHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunriseTime', 'sunriseSunsetTimeHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'position', 'locationPositionChange')

        await context.api.subscriptions.subscribeToDevices(context.config.motionSensor, 'motionSensor', 'motion', 'motionHandler')

    })

    .subscribedEventHandler('illuminanceHandler', (context, event) => {
        
        console.log("${event.name}: ${event.value}, lastStatus: ${state.lastStatus}, motionStopTime: ${state.motionStopTime}")
        let lastStatus = state.lastStatus
        if (lastStatus != 'off' && event.integerValue > 50) {
        if (hues) {
        hues.each({
        if (it.currentValue('level') == (lightLevel as Integer) && it.currentValue('hue') == hueColor ) {
        it.off()
        }
        })
        }
        if (lights) {
        
        context.api.devices.sendCommands(context.config.lights, 'switch', off)
    
        }
        state.lastStatus = 'off'
        } else {
        if (state.motionStopTime) {
        if (lastStatus != 'off') {
        let elapsed = this.now() - state.motionStopTime
        if (elapsed >= delayMinutes ? delayMinutes : 0 * 60000 - 2000) {
        if (hues) {
        hues.each({
        if (it.currentValue('level') == (lightLevel as Integer) && it.currentValue('hue') == hueColor ) {
        it.off()
        }
        })
        }
        if (lights) {
        
        context.api.devices.sendCommands(context.config.lights, 'switch', off)
    
        }
        state.lastStatus = 'off'
        }
        }
        } else {
        if (lastStatus != 'on' && event.value < 30) {
        if (lights) {
        
        context.api.devices.sendCommands(context.config.lights, 'switch', on)
    
        }
        if (hues) {
        let hueColor = 0
        if (color == 'Blue') {
        hueColor = 70
        } else {
        if (color == 'Green') {
        hueColor = 39
        } else {
        if (color == 'Yellow') {
        hueColor = 25
        } else {
        if (color == 'Orange') {
        hueColor = 10
        } else {
        if (color == 'Purple') {
        hueColor = 75
        } else {
        if (color == 'Pink') {
        hueColor = 83
        }
        }
        }
        }
        }
        }
        let newValue = ['hue': hueColor , 'saturation': 60, 'level': (lightLevel as Integer) ? (lightLevel as Integer) : 100]
        console.log("new value = $newValue")
        hues*.setColor(newValue)
        }
        state.lastStatus = 'on'
        }
        }
        }
        

	})

    .subscribedEventHandler('locationPositionChange', (context, event) => {
        
        log.trace('locationChange()')
        this.astroCheck()
        

	})

    .subscribedEventHandler('motionHandler', (context, event) => {
        
        console.log("${event.name}: ${event.value}")
        if (event.value == 'active') {
        if (this.enabled()) {
        console.log('turning on lights due to motion')
        if (lights) {
        
        context.api.devices.sendCommands(context.config.lights, 'switch', on)
    
        }
        if (hues) {
        let hueColor = 0
        if (color == 'Blue') {
        hueColor = 70
        } else {
        if (color == 'Green') {
        hueColor = 39
        } else {
        if (color == 'Yellow') {
        hueColor = 13
        } else {
        if (color == 'Orange') {
        hueColor = 10
        } else {
        if (color == 'Purple') {
        hueColor = 75
        } else {
        if (color == 'Pink') {
        hueColor = 83
        }
        }
        }
        }
        }
        }
        let newValue = ['hue': hueColor , 'saturation': 60, 'level': (lightLevel as Integer) ? (lightLevel as Integer) : 100]
        console.log("new value = $newValue")
        hues*.setColor(newValue)
        }
        state.lastStatus = 'on'
        }
        state.motionStopTime = null
        } else {
        state.motionStopTime = this.now()
        if (delayMinutes) {
        this.runIn(delayMinutes * 60, turnOffMotionAfterDelay, ['overwrite': false])
        } else {
        turnOffMotionAfterDelay
        }
        }
        

	})

    .subscribedEventHandler('sunriseSunsetTimeHandler', (context, event) => {
        
        state.lastSunriseSunsetEvent = this.now()
        console.log("SmartNightlight.sunriseSunsetTimeHandler(${app.id})")
        this.astroCheck()
        

	})
