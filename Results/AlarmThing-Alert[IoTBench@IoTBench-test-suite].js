
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Alert me when this alarm changes state (arming, armed, disarmed, alarm):', section => {
            section.deviceSetting('theAlarm').capability(['alarm']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.theAlarm, 'alarm', 'alarmStatus', 'statusChanged')

    })

    .subscribedEventHandler('statusChanged', (context, event) => {
        
        if (event.value == 'away') {
        this.sendPush('Alarm armed to \'away\'')
        } else {
        if (event.value == 'stay') {
        this.sendPush('Alarm armed to \'stay\'')
        } else {
        if (event.value == 'arming') {
        this.sendPush('Alarm is arming')
        } else {
        if (event.value == 'alarm') {
        this.sendPush('ALARM IS GOING OFF!')
        } else {
        if (event.value == 'disarmed') {
        this.sendPush('Alarm is disarmed')
        }
        }
        }
        }
        }
        

	})
