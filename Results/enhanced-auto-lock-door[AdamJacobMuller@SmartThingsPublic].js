
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


        page.section('Automatically unlock the door when open...', section => {
            section.numberSetting('secondsLater').name('Delay (in seconds):');

        });


        page.section('Notifications', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.lock1, 'lock', 'lock', 'doorHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.contact, 'contactSensor', 'contact.open', 'doorHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.contact, 'contactSensor', 'contact.closed', 'doorHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.lock1, 'lock', 'unlock', 'doorHandler')

    })

    .subscribedEventHandler('doorHandler', (context, event) => {
        
        if
        this.runIn(secondsLater, unlockDoor)
        } else {
        if
        this.unschedule(unlockDoor)
        } else {
        if
        this.unschedule(lockDoor)
        } else {
        if
        this.runIn(minutesLater * 60, lockDoor)
        } else {
        if
        this.unschedule(lockDoor)
        } else {
        if
        this.runIn(minutesLater * 60, lockDoor)
        } else {
        console.log('Unlocking the door.')
        
        context.api.devices.sendCommands(context.config.lock1, 'lock', unlock)
    
        if (location.contactBookEnabled) {
        if (recipients) {
        console.log('Sending Push Notification...')
        this.sendNotificationToContacts("$lock1 unlocked after $contact was opened or closed when $lock1 was locked!", recipients)
        }
        }
        if (phoneNumber) {
        console.log('Sending text message...')
        this.sendSms(phoneNumber, "$lock1 unlocked after $contact was opened or closed when $lock1 was locked!")
        }
        }
        }
        }
        }
        }
        }
        

	})
