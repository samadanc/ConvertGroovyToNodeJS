
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Tell me when the Sump Pump is stuck on!', section => {
            section.deviceSetting('sensor1').capability(['powerMeter']).name('');

        });


        page.section('Notifications', section => {
            section.booleanSetting('sendPushMessage').name('Push Notifications?');

        });


        page.section('System Variables', section => {
            section.textSetting('message').name('Notification message');

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
    
        log.trace("Power: $latestPowerW")
        if (!atomicState.isRunning && latestPower < maxWattage ) {
        atomicState.isRunning = true
        atomicState.startedAt = this.now()
        atomicState.stoppedAt = null
        atomicState.midCycleCheck = null
        log.trace('Cycle started.')
        } else {
        if (atomicState.isRunning && latestPower > maxWattage ) {
        if (atomicState.midCycleCheck == null) {
        atomicState.midCycleCheck = true
        atomicState.midCycleTime = this.now()
        } else {
        if (atomicState.midCycleCheck == true) {
        if (this.now() - atomicState.midCycleTime / 1000 > maxOnTime ) {
        atomicState.isRunning = false
        atomicState.stoppedAt = this.now()
        console.log("startedAt: ${atomicState.startedAt}, stoppedAt: ${atomicState.stoppedAt}")
        log.info(message)
        if (phone) {
        this.sendSms(phone, message)
        } else {
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
        }
        }
        }
        

	})
