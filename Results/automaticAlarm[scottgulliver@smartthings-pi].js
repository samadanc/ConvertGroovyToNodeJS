
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('These people...', section => {
            section.deviceSetting('people').capability(['presenceSensor']).name('');

        });


        page.section('When all leave, perform these actions...', section => {
            section.booleanSetting('setAlarmOnLeaveEnabled').name('Set the alarm');
            section.booleanSetting('leavePushMessageEnabled').name('Send a message');
            section.textSetting('leavePushMessage').name('Message');

        });


        page.section('When one arrives, perform these actions...', section => {
            section.booleanSetting('disarmAlarmOnArriveEnabled').name('Disarm the alarm');
            section.booleanSetting('arrivePushMessageEnabled').name('Send a message');
            section.textSetting('arrivePushMessage').name('Message');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.people, 'presenceSensor', 'presence', 'presence')

    })

    .subscribedEventHandler('presence', (context, event) => {
        
        if (event.value == 'present' && this.onlyPersonPresent(event.getDevice())) {
        console.log('First person back!')
        if (disarmAlarmOnArriveEnabled && this.getAlarmState() != 'off') {
        this.setAlarmState('off')
        if (arrivePushMessageEnabled) {
        this.sendPush(arrivePushMessage)
        }
        }
        } else {
        if (this.everyoneIsAway()) {
        console.log('All gone!')
        if (setAlarmOnLeaveEnabled && this.getAlarmState() != 'away') {
        this.setAlarmState('away')
        if (leavePushMessageEnabled) {
        this.sendPush(leavePushMessage)
        }
        }
        }
        }
        

	})
