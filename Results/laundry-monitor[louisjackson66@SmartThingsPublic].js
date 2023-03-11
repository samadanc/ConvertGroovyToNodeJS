
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Tell me when this washer/dryer has stopped...', section => {
            section.deviceSetting('sensor1').capability(['powerMeter']).name('');

        });


        page.section('System Variables', section => {

        });


        page.section('Notifications', section => {

        });


        page.section('Notification Message', section => {
            section.textSetting('StartMsg').name('Start Notification message');
            section.textSetting('FinishMsg').name('Finish Notification message');

        });


        page.section('['hidden': this.hideOptionsSection(), 'hideable': true], 'Additionally', section => {
            section.deviceSetting('sonos').capability(['musicPlayer']).name('On this Speaker player');
            section.deviceSetting('switches').capability(['switch']).name('Turn on these switches?');

        });


        page.section(''Version 1.0.3'', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.sensor1, 'powerMeter', 'power', 'powerInputHandler')

    })

    .subscribedEventHandler('powerInputHandler', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.sensor1, 'powerMeter', currentValue)
    
        log.trace("Power: $latestPowerW ; $minimumWattageW")
        if (latestPower > minimumWattage ) {
        atomicState.isRunning = true
        atomicState.startedAt = this.now()
        atomicState.stoppedAt = null
        atomicState.midCycleCheck = null
        if (StartMsg) {
        log.trace("0A - $StartMsg")
        this.sendMessage(StartMsg)
        if (sonos) {
        
        context.api.devices.sendCommands(context.config.sonos, 'musicPlayer', playTextAndResume)
    
        }
        }
        }
        if (latestPower <= minimumWattage ) {
        log.trace("0B - atomicState.midCycleTime=${atomicState.midCycleTime} ; minimumOffTime=$minimumOffTime")
        if (atomicState.midCycleCheck == null) {
        atomicState.midCycleCheck = true
        atomicState.midCycleTime = this.now()
        log.trace("0C - atomicState.midCycleTime=${atomicState.midCycleTime} ; minimumOffTime=$minimumOffTime")
        }
        log.trace("0D - atomicState.midCycleTime=${atomicState.midCycleTime} ; minimumOffTime=$minimumOffTime")
        atomicState.isRunning = false
        atomicState.stoppedAt = this.now()
        console.log("startedAt: ${atomicState.startedAt}, stoppedAt: ${atomicState.stoppedAt}")
        if (FinishMsg) {
        log.trace("0C - $FinishMsg")
        this.sendMessage(FinishMsg)
        if (sonos) {
        
        context.api.devices.sendCommands(context.config.sonos, 'musicPlayer', playTextAndResume)
    
        }
        }
        if (switches) {
        switches*.on()
        }
        }
        

	})
