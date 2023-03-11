
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Devices', section => {
            section.deviceSetting('lock').capability(['lock']).name('Door Lock');
            section.deviceSetting('contact').capability(['contactSensor']).name('Contact Sensor');

        });


        page.section('Automatically lock the door...', section => {
            section.numberSetting('lockAfterMinutes').name('after X minutes:');
            section.numberSetting('confirmLockAfterSeconds').name('confirm lock after X seconds:');

        });


        page.section('Notifications', section => {
            section.enumSetting('sendPushMessage').name('Send a push notification?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.lock, 'lock', 'unlock', 'doorHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.lock, 'lock', 'lock', 'doorHandler')

    })

    .subscribedEventHandler('doorHandler', (context, event) => {
        
        if
        this.unschedule()
        } else {
        if (event.value == 'unlocked') {
        this.runIn(lockAfterMinutes * 60, lockDoor)
        }
        }
        

	})
