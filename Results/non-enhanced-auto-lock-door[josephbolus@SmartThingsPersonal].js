
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select the door lock:', section => {
            section.deviceSetting('lock1').capability(['lock']).name('');

        });


        page.section('Select the door contact sensor:', section => {
            section.deviceSetting('contact').capability(['contactSensor']).name('');

        });


        page.section('Automatically lock the door when closed...', section => {
            section.numberSetting('minutesLater').name('Delay (in minutes):');

        });


        page.section('Notifications', section => {
            section.enumSetting('sendPushMessage').name('Send a push notification?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.contact, 'contactSensor', 'contact.open', 'doorHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.contact, 'contactSensor', 'contact.closed', 'doorHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.lock1, 'lock', 'lock', 'doorHandler')

    })

    .subscribedEventHandler('doorHandler', (context, event) => {
        
        if
        this.unschedule(lockDoor)
        } else {
        if
        let delay = minutesLater * 60
        this.runIn(delay, lockDoor)
        } else {
        if
        this.unschedule(lockDoor)
        } else {
        if
        let delay = minutesLater * 60
        this.runIn(delay, lockDoor)
        } else {
        console.log('Unlocking the door.')
        
        context.api.devices.sendCommands(context.config.lock1, 'lock', unlock)
    
        console.log('Sending Push Notification...')
        if (sendPushMessage != 'No') {
        this.sendPush("$lock1 unlocked after $contact was opened or closed when $lock1 was locked!")
        }
        console.log('Sending text message...')
        if (phoneNumber != '0') {
        this.sendSms(phoneNumber, "$lock1 unlocked after $contact was opened or closed when $lock1 was locked!")
        }
        }
        }
        }
        }
        

	})
