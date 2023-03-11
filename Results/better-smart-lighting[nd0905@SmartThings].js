
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select Devices', section => {
            section.deviceSetting('switches').capability(['switch']).name('Select Lights');
            section.deviceSetting('motion1').capability(['motionSensor']).name('Select Sensors');

        });


        page.section('Turn it off in... ', section => {
            section.numberSetting('minutesLater').name('Minutes?');

        });


        page.section('When who arrives:', section => {
            section.deviceSetting('people').capability(['presenceSensor']).name('');

        });


        page.section('Always turn off after that long?', section => {

        });


        page.section('Never Turn Off After Event?', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.switches, 'switch', 'switch', 'timedOff')

        await context.api.subscriptions.subscribeToDevices(context.config.people, 'presenceSensor', 'presence', 'arrivalHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.motion1, 'motionSensor', 'motion', 'motionHandler')

    })

    .subscribedEventHandler('arrivalHandler', (context, event) => {
        
        console.log("${event.name}: ${event.value}")
        let now = new Date()
        let sunTime = this.getSunriseAndSunset()
        if (event.value == 'not present' && this.everyoneIsAway()) {
        
        context.api.devices.sendCommands(context.config.switches, 'switch', off)
    
        this.unschedule()
        state.status = null
        } else {
        if (event.value == 'present' && now > sunTime.sunset) {
        console.log("turning on lights: current State is ${state.status}")
        if (state.status != 'pending') {
        this.saveState()
        }
        
        context.api.devices.sendCommands(context.config.switches, 'switch', on)
    
        if (neverTime == 'true') {
        console.log("running in $minutesLater")
        this.runIn(60 * minutesLater , restoreState)
        state.status = 'pending'
        }
        }
        }
        

	})

    .subscribedEventHandler('timedOff', (context, event) => {
        
        console.log("${event.name}: ${event.value}")
        if (event.value == 'on' && force == 'true') {
        for (let swich : switches ) {
        if (swich.currentValue('switch') == 'off') {
        swich.on()
        if (neverTime == 'true') {
        swich.off(['delay': 1000 * 60 * minutesLater ])
        }
        }
        }
        }
        

	})

    .subscribedEventHandler('motionHandler', (context, event) => {
        
        console.log("${event.name}: ${event.value}")
        let now = new Date()
        let sunTime = this.getSunriseAndSunset()
        if (event.value == 'active' && now > sunTime.sunset) {
        console.log("turning on lights: current State is ${state.status}")
        if (state.status != 'pending') {
        this.saveState()
        }
        
        context.api.devices.sendCommands(context.config.switches, 'switch', on)
    
        } else {
        if (event.value == 'inactive' && now > sunTime.sunset) {
        if (neverTime == 'true') {
        this.runIn(60 * minutesLater , scheduleCheck)
        state.status = 'pending'
        }
        }
        }
        

	})
