
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Master switch', section => {
            section.deviceSetting('masterSwitch').capability(['switch']).name('Master?');

        });


        page.section('When any of these devices trigger...', section => {
            section.deviceSetting('contact').capability(['contactSensor']).name('Contact Sensor?');
            section.deviceSetting('accelerationSensor').capability(['accelerationSensor']).name('Acceleration Sensor?');
            section.deviceSetting('motionSensor').capability(['motionSensor']).name('Motion Sensor?');
            section.deviceSetting('switchDevice').capability(['switch']).name('Switch?');
            section.deviceSetting('presenceDevice').capability(['presenceSensor']).name('Presence Sensor?');

        });


        page.section('Set off these Alarms...', section => {
            section.deviceSetting('alarm').capability(['alarm']).name('Alarm Device?');
            section.deviceSetting('alarmSwitch').capability(['switch']).name('Switch Device?');
            section.numberSetting('alarmTimeoutSeconds').name('Alarm Duration Seconds? (default 30)');
            section.numberSetting('alarmSwitchTimeoutSeconds').name('Switch Duration Seconds? (default 30)');

        });


        page.section('Send these notifications...', section => {
            section.enumSetting('sendPushMessage').name('Send a push notification?');
            section.textSetting('messageText').name('Message text?');
            section.textSetting('pushBulletAPIKey').name('Pushbullet API Key?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.motionSensor, 'motionSensor', 'motion.active', 'triggerAlarm')

        await context.api.subscriptions.subscribeToDevices(context.config.presenceDevice, 'presenceSensor', 'presence', 'triggerAlarm')

        await context.api.subscriptions.subscribeToDevices(context.config.contact, 'contactSensor', 'contact.open', 'triggerAlarm')

        await context.api.subscriptions.subscribeToDevices(context.config.masterSwitch, 'switch', 'switch', 'toggleAlarm')

        await context.api.subscriptions.subscribeToDevices(context.config.accelerationSensor, 'accelerationSensor', 'acceleration.active', 'triggerAlarm')

        await context.api.subscriptions.subscribeToDevices(context.config.switchDevice, 'switch', 'switch.on', 'triggerAlarm')

    })

    .subscribedEventHandler('toggleAlarm', (context, event) => {
        
        if (event.value == 'off') {
        this.resetAlarmSwitch()
        alarm?.off()
        log.info('Master switch turned off alarm.')
        } else {
        log.info('Master swtich turned on alarm.')
        }
        

	})

    .subscribedEventHandler('triggerAlarm', (context, event) => {
        
        let msg = 'Alarm Triggered'
        if (messageText) {
        msg = "$messageText"
        }
        
        context.api.devices.sendCommands(context.config.masterSwitch, 'switch', log)
    
        if
        msg = "Master Alarm Switch OFF - $msg"
        this.sendMsg(event.displayName, msg)
        return null
        }
        alarm?.both()
        alarmSwitch?.on()
        this.sendMsg(event.displayName, msg)
        let alarmTimeoutSeconds = alarmTimeoutSeconds ? alarmTimeoutSeconds : 30
        this.runIn(alarmTimeoutSeconds, resetAlarm)
        console.log("Reset Alarm in $alarmTimeoutSeconds Seconds")
        let alarmSwitchTimeoutSeconds = alarmSwitchTimeoutSeconds ? alarmSwitchTimeoutSeconds : 30
        this.runIn(alarmSwitchTimeoutSeconds, resetAlarmSwitch)
        console.log("Reset Switch in $alarmSwitchTimeoutSeconds Seconds")
        

	})
