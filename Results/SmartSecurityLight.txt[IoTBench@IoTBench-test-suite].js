
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
        
        if (atomicState.flashing) {
        return null
        }
        console.log("switchHandler: ${event.name}: ${event.value} isPhys ${event.physical}")
        if (event.physical) {
        if (event.value == 'on') {
        if (physicalOverride) {
        console.log('Override ON, disabling motion-control')
        atomicState.keepOff = false
        if (delayMinutes) {
        this.unschedule('turnOffMotionAfterDelay')
        }
        if (atomicState.lastStatus == 'on' && flashConfirm ) {
        this.flashTheLight()
        }
        atomicState.lastStatus = 'on'
        atomicState.physicalSwitch = true
        }
        } else {
        if (event.value == 'off') {
        atomicState.physicalSwitch = false
        atomicState.keepOff = false
        
        context.api.devices.sendCommands(context.config.light, 'switch', eventsSince)
    
        it.name == 'switch'
        })
        console.log("${recentStates?.size()} states found, last at ${(recentStates) ? recentStates[0].dateCreated : }")
        if (this.lastTwoStatesWere('off', recentStates, evt)) {
        console.log('detected two OFF taps, override motion w/lights OFF')
        if (doubleTapOff) {
        if (delayMinutes) {
        this.unschedule('turnOffMotionAfterDelay')
        }
        if (flashConfirm) {
        this.flashTheLight()
        }
        atomicState.keepOff = true
        }
        }
        }
        }
        }
        

	})

    .subscribedEventHandler('lightsOnHandler', (context, event) => {
        
        if (atomicState.flashing) {
        return null
        }
        console.log("OnHandler isPhys ${event.physical}")
        atomicState.keepOff = false
        if (!event.physical) {
        atomicState.lastStatus = 'on'
        atomicState.physicalSwitch = false
        }
        

	})

    .subscribedEventHandler('illuminanceHandler', (context, event) => {
        
        if (atomicState.flashing) {
        return null
        }
        console.log("${event.name}: ${event.value}, lastStatus: ${atomicState.lastStatus}, motionStopTime: ${atomicState.motionStopTime}")
        let lastStatus = atomicState.lastStatus
        if (atomicState.keepOff && event.integerValue >= luxLevel ) {
        atomicState.keepOff = false
        }
        if (lastStatus != 'off' && event.integerValue >= luxLevel ) {
        
        context.api.devices.sendCommands(context.config.light, 'switch', off)
    
        atomicState.lastStatus = 'off'
        atomicState.physicalSwitch = false
        atomicState.keepOff = false
        } else {
        if (atomicState.motionStopTime) {
        if (atomicState.physicalSwitch) {
        return null
        }
        if (lastStatus != 'off') {
        let elapsed = this.now() - atomicState.motionStopTime
        if (elapsed >= delayMinutes ? delayMinutes : 0 * 60000) {
        
        context.api.devices.sendCommands(context.config.light, 'switch', off)
    
        atomicState.lastStatus = 'off'
        atomicState.keepOff = false
        }
        }
        } else {
        if (lastStatus != 'on' && event.integerValue < luxLevel ) {
        if (atomicState.keepOff || atomicState.physicalSwitch) {
        return null
        }
        
        context.api.devices.sendCommands(context.config.light, 'switch', on)
    
        atomicState.lastStatus = 'on'
        }
        }
        }
        

	})

    .subscribedEventHandler('lightsOffHandler', (context, event) => {
        
        if (atomicState.flashing) {
        return null
        }
        console.log("offHandler isPhys ${event.physical}")
        atomicState.physicalSwitch = false
        atomicState.lastStatus = 'off'
        

	})

    .subscribedEventHandler('motionHandler', (context, event) => {
        
        console.log("motionHandler: ${event.name}: ${event.value}")
        if (atomicState.physicalSwitch) {
        return null
        }
        if (event.value == 'active') {
        if (this.enabled()) {
        console.log('turning on light due to motion')
        
        context.api.devices.sendCommands(context.config.light, 'switch', on)
    
        atomicState.lastStatus = 'on'
        }
        atomicState.motionStopTime = null
        } else {
        if (atomicState.keepOff) {
        if (delayMinutes) {
        this.unschedule('turnOffMotionAfterDelay')
        }
        return null
        }
        atomicState.motionStopTime = this.now()
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
