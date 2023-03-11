
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Tell me when this washer/dryer has stopped...', section => {
            section.deviceSetting('sensor1').capability(['powerMeter']).name('');

        });


        page.section('Notifications', section => {
            section.booleanSetting('sendPush').name('Alert with Push Notification?');
            section.textSetting('message').name('Notification message');

        });


        page.section('System Variables', section => {

        });


        page.section('['hidden': this.hideOptionsSection(), 'hideable': true], 'Additionally', section => {
            section.deviceSetting('switches').capability(['switch']).name('Turn on these switches?');
            section.deviceSetting('speech').capability(['speechSynthesis']).name('Speak message via: ');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.sensor1, 'powerMeter', 'power', 'powerInputHandler')

    })

    .subscribedEventHandler('powerInputHandler', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.sensor1, 'powerMeter', currentValue)
    
        if (!atomicState.isRunning || atomicState.isRunning == null && latestPower > minimumWattage && atomicState.startedAt == null) {
        atomicState.isRunning = true
        atomicState.startedAt = this.now()
        atomicState.stoppedAt = null
        atomicState.midCycleTime = null
        atomicState.realStart = false
        log.trace('Machine has woken up from slumber.')
        } else {
        if (atomicState.isRunning && latestPower > minimumWattage && this.now() - atomicState.startedAt / 1000 > minimumOnTime && !atomicState.realStart) {
        atomicState.realStart = true
        log.trace("Cycle started at ${atomicState.startedAt}")
        } else {
        if (atomicState.isRunning && latestPower < minimumWattage && atomicState.realStart) {
        if (atomicState.midCycleTime == null) {
        atomicState.midCycleTime = this.now()
        } else {
        if (this.now() - atomicState.midCycleTime / 1000 > minimumOffTime ) {
        atomicState.isRunning = false
        atomicState.stoppedAt = this.now()
        log.trace("startedAt: ${atomicState.startedAt}, stoppedAt: ${atomicState.stoppedAt}")
        atomicState.startedAt = null
        atomicState.realStart = false
        atomicState.midCycleTime = null
        log.info(message)
        if (sendSMS) {
        this.sendSms(phone, message)
        }
        if (sendPush) {
        this.sendPush(message)
        }
        if (switches) {
        switches*.on()
        }
        if (speech) {
        
        context.api.devices.sendCommands(context.config.speech, 'speechSynthesis', speak)
    
        }
        }
        }
        } else {
        if (atomicState.isRunning && latestPower > minimumWattage && atomicState.realStart) {
        atomicState.midCycleTime = null
        } else {
        if (atomicState.isRunning && latestPower < minimumWattage && !atomicState.realStart) {
        atomicState.isRunning = false
        atomicState.startedAt = null
        }
        }
        }
        }
        }
        

	})
