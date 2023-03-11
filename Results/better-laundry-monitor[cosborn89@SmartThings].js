
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When this device stops drawing power', section => {
            section.deviceSetting('meter').capability(['powerMeter']).name('');

        });


        page.section('['hidden': true, 'hideable': true], 'Power Thresholds', section => {
            section.numberSetting('startThreshold').name('start cycle when power raises above (W)');
            section.numberSetting('endThreshold').name('stop cycle when power drops below (W)');

        });


        page.section('Send this message', section => {
            section.textSetting('message').name('Notification message');

        });


        page.section('Notification method', section => {
            section.booleanSetting('sendPushMessage').name('Send a push notification?');
            section.deviceSetting('speechOut').capability(['speechSynthesis']).name('Speak message via: ');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.meter, 'powerMeter', 'power', 'handler')

    })

    .subscribedEventHandler('handler', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.meter, 'powerMeter', currentValue)
    
        log.trace("Power: $latestPowerW")
        log.trace("State: ${atomicState.cycleOn}")
        if (!atomicState.cycleOn && latestPower >= startThreshold && latestPower < 1000) {
        atomicState.cycleOn = true
        log.trace('Cycle started.')
        } else {
        if (atomicState.cycleOn && latestPower < endThreshold ) {
        this.send(message)
        if (speechOut) {
        this.speakMessage(message)
        }
        atomicState.cycleOn = false
        atomicState.cycleEnd = this.now()
        log.trace("State: ${atomicState.cycleOn}")
        }
        }
        

	})
