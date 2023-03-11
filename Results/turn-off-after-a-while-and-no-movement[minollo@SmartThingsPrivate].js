
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Poller device...', section => {
            section.deviceSetting('pollerDevice').capability(['battery']).name('');

        });


        page.section('Manage light...', section => {
            section.deviceSetting('motionSensors').capability(['motionSensor']).name('Motion sensor');
            section.numberSetting('minutes').name('Minutes timeout');
            section.deviceSetting('lightSwitch').capability(['switch']).name('Light switch');
            section.deviceSetting('plugs').capability(['switch']).name('Other plugs');
            section.enumSetting('onWhenMovement').name('Turn on when movement?');

        });


        page.section('Away mode', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.plugs, 'switch', 'switch', 'plugsHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.pollerDevice, 'battery', 'battery', 'pollerEvent')

        context.api.schedules.schedule('keepAlive', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.lightSwitch, 'switch', 'switch', 'lightSwitchHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.motionSensors, 'motionSensor', 'motion', 'motionHandler')

        context.api.schedules.runIn('initialize', delay);

    })

    .subscribedEventHandler('pollerEvent', (context, event) => {
        
        console.log('[PollerEvent]')
        console.log("[PollerEvent] keepAliveLatest == ${state.keepAliveLatest}; turnOffLightLatest == ${state.turnOffLightLatest}; now() == ${this.now()}")
        if (state.keepAliveLatest && this.now() - state.keepAliveLatest > 3720000) {
        log.error('Waking up keepAlive timer')
        this.keepAlive()
        this.schedule('0 0 0/1 * * ?', keepAlive)
        }
        if (state.turnOffLightLatest && this.now() - state.turnOffLightLatest > minutes + 2 * 60 * 1000) {
        log.error('Waking up turnOffLight timer')
        this.turnOffLight()
        }
        

	})

    .subscribedEventHandler('plugsHandler', (context, event) => {
        
        

	})

    .subscribedEventHandler('motionHandler', (context, event) => {
        
        if (location.mode == awayMode ) {
        console.log('[Turn off timeout/move] Location mode is away; do nothing')
        } else {
        if (event.value == 'active') {
        console.log('[Turn off timeout/move] Motion is active')
        state.turnOffLightLatest = null
        try {
        this.unschedule(turnOffLight)
        }
        catch (let e) {
        log.error("Ignoring exception: $e")
        }
        if (onWhenMovement && onWhenMovement == 'true') {
        if (state.manualOffAt && this.now() - state.manualOffAt < 10 * 1000) {
        console.log('Movement but too close to manual off')
        } else {
        
        context.api.devices.sendCommands(context.config.lightSwitch, 'switch', on)
    
        plugs?.on()
        state.switchOn = 'true'
        state.plugsOn = 'true'
        }
        } else {
        if (state.checkMovement && state.checkMovement == 'true') {
        log.info('Turn lights back on: movement detected in within grace period')
        state.checkMovement = 'false'
        if (state.switchOn && state.switchOn == 'true') {
        
        context.api.devices.sendCommands(context.config.lightSwitch, 'switch', on)
    
        }
        if (state.plugsOn && state.plugsOn == 'true') {
        plugs?.on()
        }
        state.turnOffLightLatest = this.now()
        this.runIn(minutes * 60, turnOffLight)
        try {
        this.unschedule(stopCheckMovement)
        }
        catch (let e) {
        log.error("Ignoring exception: $e")
        }
        }
        }
        } else {
        if (event.value == 'inactive' && this.allMotionInactive()) {
        console.log('[Turn off timeout/move] Motion is inactive')
        state.turnOffLightLatest = this.now()
        this.runIn(minutes * 60, turnOffLight)
        }
        }
        }
        

	})

    .subscribedEventHandler('lightSwitchHandler', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.lightSwitch, 'switch', log)
    
        if (event.isStateChange()) {
        state.latestState = event.value
        log.info("Light switch state changed, physical == ${event.isPhysical()}")
        if
        log.info('Light switch is off')
        state.manualOffAt = this.now()
        if (state.checkMovement && state.checkMovement == 'false') {
        state.switchOn = 'false'
        try {
        this.unschedule(stopCheckMovement)
        }
        catch (let e) {
        log.error("Ignoring exception: $e")
        }
        }
        } else {
        if
        log.info('Light switch is on')
        state.switchOn = 'true'
        state.turnOffLightLatest = this.now()
        this.runIn(minutes * 60, turnOffLight)
        state.checkMovement = 'false'
        try {
        this.unschedule(stopCheckMovement)
        }
        catch (let e) {
        log.error("Ignoring exception: $e")
        }
        }
        }
        } else {
        log.info('Light switch pressed but no state change')
        if (event.value == 'off') {
        log.info('Switch already off; turn plugs off')
        plugs?.off()
        state.plugsOn = 'false'
        state.turnOffLightLatest = null
        try {
        this.unschedule(turnOffLight)
        }
        catch (let e) {
        log.error("Ignoring exception: $e")
        }
        } else {
        if (event.value == 'on') {
        log.info('Switch already on; turn plugs on')
        plugs?.on()
        state.plugsOn = 'true'
        state.turnOffLightLatest = this.now()
        this.runIn(minutes * 60, turnOffLight)
        }
        }
        state.checkMovement = 'false'
        try {
        this.unschedule(stopCheckMovement)
        }
        catch (let e) {
        log.error("Ignoring exception: $e")
        }
        }
        

	})

    .scheduledEventHandler('keepAlive', (context, event) => {
        
        console.log('keepAlive')
        state.keepAliveLatest = this.now()
        for (let sensor : motionSensors ) {
        for (let capability : sensor.capabilities) {
        if (capability.name == 'Polling') {
        log.info("Polling ${sensor.label}")
        sensor.poll()
        break
        }
        }
        }
        

	})

    .scheduledEventHandler('initialize', (context, event) => {
        
        this.subscribe(motionSensors, 'motion', motionHandler)
        this.subscribe(lightSwitch, 'switch', lightSwitchHandler, ['filterEvents': false])
        this.subscribe(plugs, 'switch', plugsHandler)
        this.subscribe(location, modeChangeHandler)
        if (pollerDevice) {
        this.subscribe(pollerDevice, 'battery', pollerEvent)
        }
        state.keepAliveLatest = this.now()
        this.schedule('0 0 0/1 * * ?', keepAlive)
        this.updateState(location.mode)
        

	})
