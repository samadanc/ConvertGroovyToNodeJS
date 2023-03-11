
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


        page.section('Automatically lock the door...', section => {
            section.numberSetting('minutesLater').name('Delay (in minutes):');

        });


        page.section('Unlock it if the lock is manually engaged while the door is open...', section => {
            section.numberSetting('minutesLater2').name('Delay (in minutes):');

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
        let delay = minutesLater2 * 60
        this.runIn(delay, unlockDoor)
        } else {
        if
        this.unschedule(unlockDoor)
        } else {
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
        this.unschedule(lockDoor)
        this.unschedule(unlockDoor)
        }
        }
        }
        }
        }
        }
        

	})
