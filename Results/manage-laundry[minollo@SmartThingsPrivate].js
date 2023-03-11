
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Poller device...', section => {
            section.deviceSetting('pollerDevice').capability(['battery']).name('');

        });


        page.section('Manage temperature... ', section => {
            section.deviceSetting('tempSensor').capability(['temperatureMeasurement']).name('Temperature sensor');
            section.deviceSetting('heaterOutlet').capability(['switch']).name('Heater outlet');
            section.booleanSetting('heatInAwayMode').name('Heat also in away mode');

        });


        page.section('Manage light...', section => {
            section.deviceSetting('motionSensor').capability(['motionSensor']).name('Motion sensor');
            section.numberSetting('minutes').name('Minutes timeout');
            section.deviceSetting('lightSwitch').capability(['switch']).name('Light switch');

        });


        page.section('Away mode', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.pollerDevice, 'battery', 'battery', 'pollerEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.motionSensor, 'motionSensor', 'motion', 'motionHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.tempSensor, 'temperatureMeasurement', 'temperature', 'temperatureHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.lightSwitch, 'switch', 'switch', 'lightSwitchHandler')

    })

    .subscribedEventHandler('temperatureHandler', (context, event) => {
        
        console.log('[Manage Laundry] Teperature event')
        this.updateState()
        

	})

    .subscribedEventHandler('pollerEvent', (context, event) => {
        
        console.log("[PollerEvent] timerLatest==${state.timerLatest}; now()==${this.now()}")
        if (state.timerLatest && this.now() - state.timerLatest > minutes + 1 * 60 * 1000) {
        log.error('Turning off light (timer was asleep?)')
        this.turnOffLight()
        }
        

	})

    .subscribedEventHandler('motionHandler', (context, event) => {
        
        if (location.mode == awayMode ) {
        console.log('[Manage Laundry] Location mode is away; do nothing')
        } else {
        if (event.value == 'active') {
        console.log('[Manage Laundry] Motion is active')
        state.timerLatest = null
        try {
        this.unschedule(turnOffLight)
        }
        catch (let e) {
        log.error("Ignoring error: $e")
        }
        if
        console.log('[Manage Laundry] Turn lights on')
        if (state.manualOffAt && this.now() - state.manualOffAt < 60 * 1000) {
        console.log('[Manage Laundry] Too close to switch off')
        } else {
        
        context.api.devices.sendCommands(context.config.lightSwitch, 'switch', on)
    
        }
        }
        } else {
        if (event.value == 'inactive') {
        console.log('[Manage Laundry] Motion is inactive')
        try {
        this.unschedule(turnOffLight)
        }
        catch (let e) {
        log.error("Ignoring error: $e")
        }
        state.timerLatest = this.now()
        this.runIn(minutes * 60, turnOffLight)
        }
        }
        }
        

	})

    .subscribedEventHandler('lightSwitchHandler', (context, event) => {
        
        if (event.isStateChange) {
        if
        console.log('[Manage Laundry] Light switch is off')
        if (event.isPhysical()) {
        state.manualOffAt = this.now()
        }
        state.timerLatest = null
        try {
        this.unschedule(turnOffLight)
        }
        catch (let e) {
        log.error("Ignoring error: $e")
        }
        } else {
        console.log('[Manage Laundry] Light switch is on')
        try {
        this.unschedule(turnOffLight)
        }
        catch (let e) {
        log.error("Ignoring error: $e")
        }
        state.timerLatest = this.now()
        this.runIn(minutes * 60, turnOffLight)
        }
        }
        

	})
