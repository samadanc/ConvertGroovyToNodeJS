
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Control this light...', section => {
            section.deviceSetting('light').capability(['switch']).name('');

        });


        page.section('Turning on when it\'s dark and there\'s movement...', section => {
            section.deviceSetting('motionSensor').capability(['motionSensor']).name('Where?');

        });


        page.section('And then off when it\'s light or there\'s been no movement for...', section => {
            section.numberSetting('delayMinutes').name('Minutes?');

        });


        page.section('Using either on this light sensor (optional) or the local sunrise and sunset', section => {
            section.deviceSetting('lightSensor').capability(['illuminanceMeasurement']).name('');
            section.numberSetting('luxLevel').name('Darkness Lux level?');

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
            section.textSetting('zipCode').name('');

        });


        page.section('Overrides', section => {
            section.booleanSetting('physicalOverride').name('Physical override?');
            section.booleanSetting('doubleTapOn').name('Double-Tap ON override?');
            section.booleanSetting('doubleTapOff').name('Double-Tap OFF override?');
            section.booleanSetting('flashConfirm').name('Flash lights to confirm overrides?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.lightSensor, 'illuminanceMeasurement', 'illuminance', 'illuminanceHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.light, 'switch', 'switch', 'switchHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.light, 'switch', 'switch.off', 'lightsOffHandler')

        context.api.schedules.schedule('astroCheck', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.light, 'switch', 'switch.on', 'lightsOnHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.motionSensor, 'motionSensor', 'motion', 'motionHandler')

    })

    .subscribedEventHandler('switchHandler', (context, event) => {
        
        if (state.flashing) {
        return null
        }
        console.log("switchHandler: ${event.name}: ${event.value}")
        
        context.api.devices.sendCommands(context.config.light, 'switch', eventsSince)
    
        it.name == 'switch'
        })
        console.log("${recentStates?.size()} states found, last at ${(recentStates) ? recentStates[0].dateCreated : }")
        if (event.isPhysical()) {
        if (event.value == 'on') {
        state.keepOff = false
        if (state.lastStatus == 'off') {
        if (physicalOverride) {
        state.physical = true
        }
        } else {
        if (this.lastTwoStatesWere('on', recentStates, evt)) {
        console.log('detected two ON taps, override motion w/lights ON')
        if (doubleTapOn) {
        if (flashConfirm) {
        this.flashTheLight()
        }
        state.physical = true
        }
        }
        }
        } else {
        if (event.value == 'off') {
        state.physical = false
        state.keepOff = false
        if (this.lastTwoStatesWere('off', recentStates, evt)) {
        console.log('detected two OFF taps, override motion w/lights OFF')
        if (doubleTapOff) {
        this.unschedule('turnOffMotionAfterDelay')
        if (flashConfirm) {
        this.flashTheLight()
        }
        state.keepOff = true
        }
        }
        }
        }
        }
        

	})

    .subscribedEventHandler('lightsOnHandler', (context, event) => {
        
        if (state.flashing) {
        return null
        }
        console.log("lightsOnHandler: ${event.name}: ${event.value}")
        if (event.isPhysical()) {
        state.physical = true
        }
        state.keepOff = false
        

	})

    .subscribedEventHandler('illuminanceHandler', (context, event) => {
        
        if (state.flashing) {
        return null
        }
        console.log("${event.name}: ${event.value}, lastStatus: ${state.lastStatus}, motionStopTime: ${state.motionStopTime}")
        let lastStatus = state.lastStatus
        if (state.keepOff && event.integerValue >= luxLevel ) {
        state.keepOff = false
        }
        if (lastStatus != 'off' && event.integerValue >= luxLevel ) {
        
        context.api.devices.sendCommands(context.config.light, 'switch', off)
    
        state.lastStatus = 'off'
        state.physical = false
        state.keepOff = false
        } else {
        if (state.motionStopTime) {
        if (state.physical) {
        return null
        }
        if (lastStatus != 'off') {
        let elapsed = this.now() - state.motionStopTime
        if (elapsed >= delayMinutes ? delayMinutes : 0 * 60000) {
        
        context.api.devices.sendCommands(context.config.light, 'switch', off)
    
        state.lastStatus = 'off'
        state.keepOff = false
        }
        }
        } else {
        if (lastStatus != 'on' && event.integerValue < luxLevel ) {
        if (state.keepOff) {
        return null
        }
        
        context.api.devices.sendCommands(context.config.light, 'switch', on)
    
        state.lastStatus = 'on'
        state.physical = false
        }
        }
        }
        

	})

    .subscribedEventHandler('lightsOffHandler', (context, event) => {
        
        if (state.flashing) {
        return null
        }
        console.log("lightsOffHandler: ${event.name}: ${event.value}")
        state.physical = false
        state.lastStatus = 'off'
        

	})

    .subscribedEventHandler('motionHandler', (context, event) => {
        
        console.log("motionHandler: ${event.name}: ${event.value}")
        if (state.physical) {
        return null
        }
        if (event.value == 'active') {
        if (this.enabled()) {
        console.log('turning on light due to motion')
        
        context.api.devices.sendCommands(context.config.light, 'switch', on)
    
        state.lastStatus = 'on'
        }
        state.motionStopTime = null
        } else {
        if (state.keepOff) {
        return null
        }
        state.motionStopTime = this.now()
        if (delayMinutes) {
        this.unschedule('turnOffMotionAfterDelay')
        this.runIn(delayMinutes * 60, 'turnOffMotionAfterDelay', ['overwrite': false])
        } else {
        this.turnOffMotionAfterDelay()
        }
        }
        

	})

    .scheduledEventHandler('astroCheck', (context, event) => {
        
        let s = this.getSunriseAndSunset(['zipCode': zipCode , 'sunriseOffset': sunriseOffset , 'sunsetOffset': sunsetOffset ])
        state.riseTime = s.sunrise.time
        state.setTime = s.sunset.time
        console.log("rise: ${new Date(state.riseTime)}(${state.riseTime}), set: ${new Date(state.setTime)}(${state.setTime})")
        

	})
