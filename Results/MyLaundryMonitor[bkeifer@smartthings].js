
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Tell me when this washer has stopped...', section => {
            section.deviceSetting('washerSensor').capability(['powerMeter']).name('');

        });


        page.section('Tell me when this dryer has stopped...', section => {
            section.deviceSetting('dryerSensor').capability(['accelerationSensor']).name('');

        });


        page.section('Notifications', section => {
            section.booleanSetting('sendPushMessage').name('Push Notifications?');

        });


        page.section('System Variables', section => {
            section.textSetting('message').name('Notification message');

        });


        page.section('['hidden': this.hideOptionsSection(), 'hideable': true], 'Additionally', section => {
            section.deviceSetting('switches').capability(['switch']).name('Turn on these switches?');
            section.deviceSetting('speaker').capability(['musicPlayer']).name('Speak message via: ');

        });


        page.section('Logstash Server', section => {
            section.textSetting('logstash_host').name('Logstash Hostname/IP');
            section.numberSetting('logstash_port').name('Logstash Port');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.washerSensor, 'powerMeter', 'power', 'powerInputHandler')

    })

    .subscribedEventHandler('powerInputHandler', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.washerSensor, 'powerMeter', currentValue)
    
        console.log("Power updated: $latestPowerW")
        if (!atomicState.washerRunning && latestPower > minimumWattage ) {
        atomicState.washerRunning = true
        atomicState.washerStartedAt = this.now()
        atomicState.washerStoppedAt = null
        this.stash("Cycle started.  Latest Power: $latestPower")
        this.dumpState()
        } else {
        if (atomicState.washerRunning && latestPower < minimumWattage ) {
        this.stash('Power low.')
        if (!atomicState.washerWaiting) {
        this.stash('Entering wait mode.')
        this.runIn(minimumOffTime, cycleDone)
        atomicState.washerWaiting = true
        }
        } else {
        if (atomicState.washerWaiting && latestPower > minimumWattage ) {
        this.stash('Cycle continuing!')
        atomicState.washerWaiting = false
        this.unschedule()
        }
        }
        }
        

	})
