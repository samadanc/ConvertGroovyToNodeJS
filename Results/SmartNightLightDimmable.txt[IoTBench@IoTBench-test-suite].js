
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Control these lights...', section => {
            section.deviceSetting('lights').capability(['switch']).name('');

        });


        page.section('Set the following dimmers...', section => {
            section.deviceSetting('dimmers').capability(['switchLevel']).name('');
            section.numberSetting('level').name('How bright?, 0-99');

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
            section.textSetting('zipCode').name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.lightSensor, 'illuminanceMeasurement', 'illuminance', 'illuminanceHandler')

        context.api.schedules.schedule('scheduleCheck', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.motionSensor, 'motionSensor', 'motion', 'motionHandler')

        context.api.schedules.schedule('astroCheck', delay);

    })

    .subscribedEventHandler('illuminanceHandler', (context, event) => {
        
        console.log("${event.name}: ${event.value}, lastStatus: ${state.lastStatus}, motionStopTime: ${state.motionStopTime}")
        let lastStatus = state.lastStatus
        if (lastStatus != 'off' && event.integerValue > 999) {
        
        context.api.devices.sendCommands(context.config.lights, 'switch', off)
    
        
        context.api.devices.sendCommands(context.config.dimmers, 'switchLevel', off)
    
        state.dimmers = 'off'
        state.lastStatus = 'off'
        } else {
        if (state.motionStopTime) {
        if (lastStatus != 'off') {
        let elapsed = this.now() - state.motionStopTime
        if (elapsed >= delayMinutes ? delayMinutes : 0 * 60000) {
        
        context.api.devices.sendCommands(context.config.lights, 'switch', off)
    
        
        context.api.devices.sendCommands(context.config.dimmers, 'switchLevel', off)
    
        state.dimmers = 'off'
        state.lastStatus = 'off'
        }
        }
        } else {
        if (lastStatus != 'on' && event.value < 30) {
        
        context.api.devices.sendCommands(context.config.lights, 'switch', on)
    
        settings.dimmers?.setLevel(level)
        state.lastStatus = 'on'
        }
        }
        }
        

	})

    .subscribedEventHandler('motionHandler', (context, event) => {
        
        console.log("${event.name}: ${event.value}")
        if (event.value == 'active') {
        if (this.enabled()) {
        console.log('turning on lights due to motion')
        settings.dimmers?.setLevel(level)
        
        context.api.devices.sendCommands(context.config.lights, 'switch', on)
    
        state.lastStatus = 'on'
        state.dimmers = 'on'
        }
        state.motionStopTime = null
        } else {
        state.motionStopTime = this.now()
        }
        

	})

    .scheduledEventHandler('scheduleCheck', (context, event) => {
        
        if (state.motionStopTime && state.lastStatus != 'off') {
        let elapsed = this.now() - state.motionStopTime
        if (elapsed >= delayMinutes ? delayMinutes : 0 * 60000) {
        console.log("Turning off $lights and $dimmers now")
        
        context.api.devices.sendCommands(context.config.lights, 'switch', off)
    
        
        context.api.devices.sendCommands(context.config.dimmers, 'switchLevel', off)
    
        state.lastStatus = 'off'
        }
        }
        

	})

    .scheduledEventHandler('astroCheck', (context, event) => {
        
        let s = this.getSunriseAndSunset(['zipCode': zipCode , 'sunriseOffset': sunriseOffset , 'sunsetOffset': sunsetOffset ])
        state.riseTime = s.sunrise.time
        state.setTime = s.sunset.time
        console.log("rise: ${new Date(state.riseTime)}(${state.riseTime}), set: ${new Date(state.setTime)}(${state.setTime})")
        

	})
