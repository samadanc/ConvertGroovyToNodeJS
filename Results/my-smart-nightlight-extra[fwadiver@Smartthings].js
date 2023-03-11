
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Control these lights...', section => {
            section.deviceSetting('lights').capability(['switch']).name('');

        });


        page.section('Turning on when it\'s dark and there\'s movement...', section => {
            section.deviceSetting('motionSensor').capability(['motionSensor']).name('Where?');

        });


        page.section('Or, turn on when one of these contacts opened', section => {
            section.deviceSetting('contacts').capability(['contactSensor']).name('Select Contacts');

        });


        page.section('And then off when it\'s light or there\'s been no movement for or the contact is closed for...', section => {
            section.numberSetting('delayMinutes').name('Minutes?');

        });


        page.section('Using either on this light sensor (optional) or the local sunrise and sunset', section => {
            section.deviceSetting('lightSensor').capability(['illuminanceMeasurement']).name('');
            section.numberSetting('darkvalue').name('Luninance Value to use?');

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


        page.section('How much delay when switch is turned on while it is already on? (optional, if nothing is entered, won\'t turn off.)', section => {
            section.numberSetting('bigDelayMinutes').name('Minutes?');

        });


        page.section('Specify the level of tracing to be done.  Defaults to none', section => {
            section.enumSetting('trclevel').name('Trace Level');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.lightSensor, 'illuminanceMeasurement', 'illuminance', 'illuminanceHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.contacts, 'contactSensor', 'contact', 'contactHandler')

        context.api.schedules.runIn('astroCheck', delay);

        context.api.schedules.schedule('astroCheck', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.lights, 'switch', 'switch.on', 'delayChange')

        await context.api.subscriptions.subscribeToDevices(context.config.motionSensor, 'motionSensor', 'motion', 'motionHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.lights, 'switch', 'switch.off', 'turnedOff')

    })

    .subscribedEventHandler('illuminanceHandler', (context, event) => {
        
        let lightsw = lights.currentSwitch
        this.DEBUG("illuminanceHandler-start: ${event.name}: ${event.value}, light is: $lightsw, motionStopTime: ${state.motionStopTime} myState: ${state.myState}")
        state.illuminance = event.integerValue
        if (lightsw != 'on' && event.integerValue > darkvalue && state.pushed != 'pushed') {
        
        context.api.devices.sendCommands(context.config.lights, 'switch', off)
    
        state.lastStatus = 'off'
        } else {
        if (state.motionStopTime) {
        if (lightsw != 'off') {
        let elapsed = this.now() - state.motionStopTime
        if (elapsed >= delayMinutes ? delayMinutes : 0 * 60000) {
        
        context.api.devices.sendCommands(context.config.lights, 'switch', off)
    
        state.lastStatus = 'off'
        }
        }
        } else {
        if (lightsw != 'on' && event.integerValue < darkvalue && state.offpushed == null && state.trigger != 2) {
        
        context.api.devices.sendCommands(context.config.lights, 'switch', on)
    
        state.lastStatus = 'on'
        }
        }
        }
        this.DEBUG("illuminanceHandler-end: ${event.name}: ${event.value}, light is: ${state.lastStatus}, motionStopTime: ${state.motionStopTime} myState: ${state.myState}")
        

	})

    .subscribedEventHandler('turnedOff', (context, event) => {
        
        this.DEBUG("turnedOff: ${event.name}: ${event.value} SwitchOnStatus: ${state.pushed}")
        state.myState = 'Light Turned Off'
        if (state.trigger > 1) {
        state.trigger = 2
        }
        if (state.pushed == 'pushed') {
        state.pushed = 'delay'
        
        context.api.devices.sendCommands(context.config.lights, 'switch', indicatorWhenOff)
    
        } else {
        if (event.isPhysical()) {
        
        context.api.devices.sendCommands(context.config.lights, 'switch', indicatorWhenOn)
    
        state.myState = 'Light Turned Off at Switch'
        if (this.daytime()) {
        state.ontime = state.setTime
        state.offpushed = 'day'
        } else {
        state.offpushed = 'night'
        if (this.now() < state.riseTime) {
        state.ontime = state.riseTime
        } else {
        state.ontime = state.riseTime + 86400000
        }
        }
        } else {
        
        context.api.devices.sendCommands(context.config.lights, 'switch', indicatorWhenOff)
    
        }
        }
        state.lastStatus = 'off'
        this.TRACE(state.myState)
        this.DEBUG("turnedOff: ${state.offpushed} OnTime: ${state.ontime}")
        

	})

    .subscribedEventHandler('contactHandler', (context, event) => {
        
        this.DEBUG("contactHandler: ${event.name}: ${event.value}")
        if (event.value == 'open') {
        if (this.enabled()) {
        this.DEBUG('Turning on lights by contact opening')
        
        context.api.devices.sendCommands(context.config.lights, 'switch', on)
    
        state.lastStatus = 'on'
        if (state.trigger == 2) {
        state.trigger = 3
        }
        }
        state.motionStopTime = null
        state.myState = 'Leave Light On'
        } else {
        if (event.value == 'closed') {
        if (this.daytime()) {
        state.motionStopTime = this.now()
        } else {
        state.motionStopTime = null
        state.myState = 'Leave Light On'
        }
        if (state.pushed == 'pushed') {
        if (bigDelayMinutes) {
        this.scheduleLightOut(bigDelayMinutes * 60)
        state.myState = 'Schedule Light Out'
        } else {
        state.myState = 'Leave Light On'
        this.unschedule(turnOffMotionAfterDelay)
        }
        } else {
        if (this.daytime()) {
        if (delayMinutes) {
        this.scheduleLightOut(delayMinutes * 60)
        } else {
        this.scheduleLightOut(0)
        }
        state.myState = 'Schedule Light Out'
        } else {
        state.myState = 'Leave Light On'
        }
        }
        }
        }
        this.TRACE("${event.name}: ${event.value} - ${state.myState}")
        this.DEBUG("motionHandler: Light Action - ${state.myState}")
        

	})

    .subscribedEventHandler('delayChange', (context, event) => {
        
        this.DEBUG("delayChange lastStatus: ${state.lastStatus}")
        this.DEBUG("event from digital actuation? ${event.isDigital()}")
        this.DEBUG("event from physical actuation? ${event.isPhysical()}")
        this.DEBUG("Is this event a state change? ${event.isStateChange()}")
        this.DEBUG("The source of this event is: ${event.source}")
        this.DEBUG("The value of this event as a string: ${event.value}")
        this.DEBUG("the name of this event: ${event.name}")
        this.DEBUG("event id: ${event.id}")
        this.DEBUG("event raw description: ${event.description}")
        this.DEBUG("event description text: ${event.descriptionText}")
        state.offpushed = null
        if (event.isPhysical() && event.isStateChange()) {
        state.pushed = 'pushed'
        } else {
        if (delayMinutes && state.trigger != 3) {
        this.scheduleLightOut(delayMinutes * 60)
        }
        }
        if (state.pushed == 'pushed') {
        state.myState = 'Light turned on at switch'
        
        context.api.devices.sendCommands(context.config.lights, 'switch', indicatorWhenOn)
    
        } else {
        state.myState = 'Light turned on'
        
        context.api.devices.sendCommands(context.config.lights, 'switch', indicatorWhenOff)
    
        }
        state.lastStatus = 'on'
        this.TRACE(state.myState)
        

	})

    .subscribedEventHandler('motionHandler', (context, event) => {
        
        let lightsw = lights.currentSwitch
        this.DEBUG("motionHandler: ${event.name}: ${event.value} Light Is: ${state.lastStatus} : $lightsw")
        if (event.value == 'active') {
        if (lightsw == 'off') {
        state.myState = 'Leave Light Off'
        }
        if (this.enabled()) {
        if (lightsw == 'off') {
        state.myState = 'Turning on lights due to motion'
        
        context.api.devices.sendCommands(context.config.lights, 'switch', on)
    
        } else {
        state.myState = 'Leave Light On'
        }
        state.lastStatus = 'on'
        }
        state.motionStopTime = null
        } else {
        state.motionStopTime = this.now()
        if (state.pushed == 'pushed') {
        if (bigDelayMinutes) {
        this.scheduleLightOut(bigDelayMinutes * 60)
        state.myState = 'Schedule Light Off'
        } else {
        state.myState = 'Unschedule turnOffMotionAfterDelay'
        this.unschedule(turnOffMotionAfterDelay)
        }
        } else {
        if (lightsw == 'on') {
        if (this.enabled()) {
        if (delayMinutes) {
        this.scheduleLightOut(delayMinutes * 60)
        } else {
        this.scheduleLightOut(0)
        }
        state.myState = 'Schedule Light Off'
        } else {
        
        context.api.devices.sendCommands(context.config.lights, 'switch', off)
    
        state.lastStatus = 'off'
        state.myState = 'Lights turned off due to luminance'
        }
        }
        }
        }
        this.DEBUG("motionHandler: Light Action - ${state.myState}")
        this.TRACE("${event.name}: ${event.value} - ${state.myState}")
        

	})

    .scheduledEventHandler('astroCheck', (context, event) => {
        
        let s = this.getSunriseAndSunset(['zipCode': zipCode , 'sunriseOffset': sunriseOffset , 'sunsetOffset': sunsetOffset ])
        state.riseTime = s.sunrise.time
        state.setTime = s.sunset.time
        let msg = "rise: ${new Date(state.riseTime)}(${state.riseTime}), set: ${new Date(state.setTime)}(${state.setTime})"
        this.DEBUG(msg)
        

	})
