
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Tell me when this washer has stopped...', section => {
            section.deviceSetting('sensor1').capability(['powerMeter']).name('');

        });


        page.section('User 1', section => {
            section.deviceSetting('myswitchUser1').capability(['switch']).name('');
            section.textSetting('nameUser1').name('Name?');

        });


        page.section('['hidden': true, 'hideable': true], 'User 2', section => {
            section.deviceSetting('myswitchUser2').capability(['switch']).name('');
            section.textSetting('nameUser2').name('Name?');

        });


        page.section('['hidden': true, 'hideable': true], 'User 3', section => {
            section.deviceSetting('myswitchUser3').capability(['switch']).name('');
            section.textSetting('nameUser3').name('Name?');

        });


        page.section('['hidden': true, 'hideable': true], 'User 4', section => {
            section.deviceSetting('myswitchUser4').capability(['switch']).name('');
            section.textSetting('nameUser4').name('Name?');

        });


        page.section('['hidden': true, 'hideable': true], 'User 5', section => {
            section.deviceSetting('myswitchUser5').capability(['switch']).name('');
            section.textSetting('nameUser5').name('Name?');

        });


        page.section('['hidden': true, 'hideable': true], 'User 6', section => {
            section.deviceSetting('myswitchUser6').capability(['switch']).name('');
            section.textSetting('nameUser6').name('Name?');

        });


        page.section('System Variables', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.sensor1, 'powerMeter', 'power', 'powerInputHandler')

    })

    .subscribedEventHandler('powerInputHandler', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.sensor1, 'powerMeter', currentValue)
    
        log.trace("Power: $latestPowerW")
        if (!atomicState.isRunning && latestPower > minimumWattage ) {
        atomicState.isRunning = true
        atomicState.startedAt = this.now()
        atomicState.stoppedAt = null
        log.trace('Cycle started.')
        this.sendNotificationEvent('Cycle started.')
        this.sendpush('Cycle started.')
        } else {
        if (atomicState.isRunning && latestPower < minimumWattage ) {
        atomicState.isRunning = false
        atomicState.stoppedAt = this.now()
        console.log("startedAt: ${atomicState.startedAt}, stoppedAt: ${atomicState.stoppedAt}")
        this.sendNotificationEvent('Cycle finished.')
        if (myswitchUser1) {
        if (myswitchUser1.currentSwitch == 'on') {
        let message = "$nameUser1 - Your wash is done!"
        this.sendSms(phoneUser1, message)
        }
        }
        if (myswitchUser2) {
        if (myswitchUser2.currentSwitch == 'on') {
        let message = "$nameUser2 - Your wash is done!"
        this.sendSms(phoneUser2, message)
        }
        }
        if (myswitchUser3) {
        if (myswitchUser3.currentSwitch == 'on') {
        let message = "$nameUser3 - Your wash is done!"
        this.sendSms(phoneUser3, message)
        }
        }
        if (myswitchUser4) {
        if (myswitchUser4.currentSwitch == 'on') {
        let message = "$nameUser4 - Your wash is done!"
        this.sendSms(phoneUser4, message)
        }
        }
        if (myswitchUser5) {
        if (myswitchUser5.currentSwitch == 'on') {
        let message = "$nameUser5 - Your wash is done!"
        this.sendSms(phoneUser5, message)
        }
        }
        if (myswitchUser6) {
        if (myswitchUser6.currentSwitch == 'on') {
        let message = "$nameUser6 - Your wash is done!"
        this.sendSms(phoneUser6, message)
        }
        }
        } else {
        }
        }
        

	})
