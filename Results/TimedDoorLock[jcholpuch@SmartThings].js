
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select the door lock:', section => {
            section.deviceSetting('lock1').capability(['lock']).name('');

        });


        page.section('Automatically lock the door when closed...', section => {
            section.numberSetting('minutesLater').name('Delay (in minutes):');

        });


        page.section('Notifications', section => {
            section.enumSetting('sendPushMessage').name('Send a push notification?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.lock1, 'lock', 'lock', 'doorHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.lock1, 'lock', 'unlock', 'doorHandler')

    })

    .subscribedEventHandler('doorHandler', (context, event) => {
        
        if (event.value == 'unlocked') {
        let delay = minutesLater * 60
        this.runIn(delay, lockDoor)
        } else {
        if (event.value == 'locked') {
        this.unschedule(lockDoor)
        }
        }
        

	})
