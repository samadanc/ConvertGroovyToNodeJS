
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Poller device...', section => {
            section.deviceSetting('pollerDevice').capability(['battery']).name('');

        });


        page.section('Sprinklers', section => {
            section.booleanSetting('sprinklersEnabled').name('Enabled?');
            section.deviceSetting('globalSwitch').capability(['switch']).name('Global Switch');
            section.deviceSetting('sprinkler1').capability(['switch']).name('Sprinkler 1');
            section.numberSetting('time1').name('Time sprinkler 1');
            section.deviceSetting('sprinkler2').capability(['switch']).name('Sprinkler 2');
            section.numberSetting('time2').name('Time sprinkler 2');
            section.deviceSetting('sprinkler3').capability(['switch']).name('Sprinkler 3');
            section.numberSetting('time3').name('Time sprinkler 3');
            section.deviceSetting('sprinkler4').capability(['switch']).name('Sprinkler 4');
            section.numberSetting('time4').name('Time sprinkler 4');

        });


        page.section('Starting Times', section => {
            section.timeSetting('startTime1').name('Start time morning');
            section.booleanSetting('enabledStartTime1').name('Morning enabled?');
            section.timeSetting('startTime2').name('Start time afternoon');
            section.booleanSetting('enabledStartTime2').name('Afternoon enabled?');
            section.timeSetting('startTime3').name('Start time evening');
            section.booleanSetting('enabledStartTime3').name('Evening enabled?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.sprinkler2, 'switch', 'switch.off', 'startSprinkler3')

        await context.api.subscriptions.subscribeToDevices(context.config.sprinkler1, 'switch', 'switch.off', 'startSprinkler2')

        await context.api.subscriptions.subscribeToDevices(context.config.globalSwitch, 'switch', 'switch.on', 'globalSwitchOn')

        await context.api.subscriptions.subscribeToDevices(context.config.pollerDevice, 'battery', 'battery', 'pollerEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.sprinkler3, 'switch', 'switch.off', 'startSprinkler4')

        await context.api.subscriptions.subscribeToDevices(context.config.globalSwitch, 'switch', 'switch.off', 'globalSwitchOff')

        context.api.schedules.runIn('timeMonitor', delay);

    })

    .subscribedEventHandler('startSprinkler2', (context, event) => {
        
        if (state.running == true) {
        log.info("Turning on Sprinker 2 for $time2 minutes")
        try {
        this.unschedule(stopSprinkler1)
        }
        catch (let e) {
        log.error("Ignoring error: $e")
        }
        
        context.api.devices.sendCommands(context.config.sprinkler2, 'switch', on)
    
        this.waitForUpdate(sprinkler2, 'on')
        let nowTime = this.now()
        let theDate = new Date(nowTime + time2 * 60 * 1000)
        this.runOnce(theDate, stopSprinkler2)
        }
        

	})

    .subscribedEventHandler('startSprinkler3', (context, event) => {
        
        try {
        this.unschedule(stopSprinkler2)
        }
        catch (let e) {
        log.error("Ignoring error: $e")
        }
        if (state.running == true && sprinkler3 ) {
        log.info("Turning on Sprinker 3 for $time3 minutes")
        
        context.api.devices.sendCommands(context.config.sprinkler3, 'switch', on)
    
        this.waitForUpdate(sprinkler3, 'on')
        let nowTime = this.now()
        let theDate = new Date(nowTime + time3 * 60 * 1000)
        this.runOnce(theDate, stopSprinkler3)
        } else {
        state.running = false
        
        context.api.devices.sendCommands(context.config.globalSwitch, 'switch', off)
    
        }
        

	})

    .subscribedEventHandler('pollerEvent', (context, event) => {
        
        console.log('[PollerEvent]')
        if (state.keepAliveLatest && this.now() - state.keepAliveLatest > 450000) {
        log.error('Waking up timer')
        this.timeMonitor()
        }
        

	})

    .subscribedEventHandler('globalSwitchOn', (context, event) => {
        
        console.log("globalSwitchOn: $evt, $settings")
        if (state.running) {
        if (sprinkler1.currentSwitch == 'on') {
        log.info('Manual shut down of sprinkler 1')
        try {
        this.unschedule(stopSprinkler1)
        }
        catch (let e) {
        log.error("Ignoring error: $e")
        }
        this.stopSprinkler1()
        } else {
        if (sprinkler2.currentSwitch == 'on') {
        log.info('Manual shut down of sprinkler 2')
        try {
        this.unschedule(stopSprinkler2)
        }
        catch (let e) {
        log.error("Ignoring error: $e")
        }
        this.stopSprinkler2()
        } else {
        if (sprinkler3 && sprinkler3.currentSwitch == 'on') {
        log.info('Manual shut down of sprinkler 3')
        try {
        this.unschedule(stopSprinkler3)
        }
        catch (let e) {
        log.error("Ignoring error: $e")
        }
        this.stopSprinkler3()
        } else {
        if (sprinkler4 && sprinkler4.currentSwitch == 'on') {
        log.info('Manual shut down of sprinkler 4')
        try {
        this.unschedule(stopSprinkler4)
        }
        catch (let e) {
        log.error("Ignoring error: $e")
        }
        this.stopSprinkler4()
        } else {
        log.error('State is flagged as running, but no switches are reported on; timing issue?')
        state.running = false
        
        context.api.devices.sendCommands(context.config.globalSwitch, 'switch', off)
    
        }
        }
        }
        }
        } else {
        this.startSprinkler1(true)
        }
        

	})

    .subscribedEventHandler('startSprinkler4', (context, event) => {
        
        try {
        this.unschedule(stopSprinkler3)
        }
        catch (let e) {
        log.error("Ignoring error: $e")
        }
        if (state.running == true && sprinkler4 ) {
        log.info("Turning on Sprinker 4 for $time4 minutes")
        
        context.api.devices.sendCommands(context.config.sprinkler4, 'switch', on)
    
        this.waitForUpdate(sprinkler4, 'on')
        let nowTime = this.now()
        let theDate = new Date(nowTime + time4 * 60 * 1000)
        this.runOnce(theDate, stopSprinkler4)
        } else {
        state.running = false
        
        context.api.devices.sendCommands(context.config.globalSwitch, 'switch', off)
    
        }
        

	})

    .subscribedEventHandler('globalSwitchOff', (context, event) => {
        
        console.log("globalSwitchOff: $evt, $settings")
        state.running = false
        sprinkler1?.off()
        sprinkler2?.off()
        sprinkler3?.off()
        sprinkler4?.off()
        

	})

    .scheduledEventHandler('timeMonitor', (context, event) => {
        
        console.log('timeMonitor')
        this.runIn(300, timeMonitor)
        state.keepAliveLatest = this.now()
        let nowTime = this.now()
        if (sprinklersEnabled && state.running == false) {
        let startTime
        let startDate
        if (enabledStartTime1) {
        startDate = this.timeToday(startTime1, location.timeZone)
        startTime = startDate.getTime()
        if (nowTime > startTime && nowTime - startTime < 10 * 60 * 1000) {
        log.info("Activating sprinklers, start time 1: $startDate")
        this.startSprinkler1(false)
        } else {
        if (startTime2 && enabledStartTime2 ) {
        startDate = this.timeToday(startTime2, location.timeZone)
        startTime = startDate.getTime()
        if (nowTime > startTime && nowTime - startTime < 10 * 60 * 1000) {
        log.info("Activating sprinklers, start time 2: $startDate")
        this.startSprinkler1(false)
        } else {
        if (startTime3 && enabledStartTime3 ) {
        startDate = this.timeToday(startTime3, location.timeZone)
        startTime = startDate.getTime()
        if (nowTime > startTime && nowTime - startTime < 10 * 60 * 1000) {
        log.info("Activating sprinklers, start time 3: $startDate")
        this.startSprinkler1(false)
        }
        }
        }
        }
        }
        }
        } else {
        console.log("sprinklersEnabled = $sprinklersEnabled; state.running = ${state.running}")
        if (state.running && state.lastRunTime == null || nowTime - state.lastRunTime > 120 * 60 * 1000) {
        log.warn('state.running seems off; resetting it and making sure everything is off')
        state.running = false
        sprinkler1?.off()
        sprinkler2?.off()
        sprinkler3?.off()
        sprinkler4?.off()
        }
        }
        

	})
