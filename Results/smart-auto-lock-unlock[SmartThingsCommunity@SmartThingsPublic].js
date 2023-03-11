
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select the door lock:', section => {
            section.deviceSetting('lock1').capability(['lock']).name('');

        });


        page.section('Select the door contact sensor:', section => {
            section.deviceSetting('contact1').capability(['contactSensor']).name('');

        });


        page.section('Automatically lock the door when closed...', section => {
            section.numberSetting('minutesLater').name('Delay (in minutes):');

        });


        page.section('Automatically unlock the door when open...', section => {
            section.numberSetting('secondsLater').name('Delay (in seconds):');

        });


        page.section('Push notification?', section => {
            section.enumSetting('sendPushMessage').name('Send push notification?');

        });


        page.section('Text message?', section => {
            section.enumSetting('sendText').name('Send text message notification?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.lock1, 'lock', 'lock', 'doorHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.contact1, 'contactSensor', 'contact.closed', 'doorHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.contact1, 'contactSensor', 'contact.open', 'doorHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.lock1, 'lock', 'unlock', 'doorHandler')

    })

    .subscribedEventHandler('doorHandler', (context, event) => {
        
        if
        let delay = secondsLater
        this.runIn(delay, unlockDoor)
        } else {
        if
        this.unschedule(unlockDoor)
        } else {
        if
        this.unschedule(lockDoor)
        } else {
        if
        console.log("Unlocking $lock1...")
        
        context.api.devices.sendCommands(context.config.lock1, 'lock', unlock)
    
        let delay = minutesLater * 60
        this.runIn(delay, lockDoor)
        } else {
        if
        this.unschedule(lockDoor)
        console.log("Unlocking $lock1...")
        
        context.api.devices.sendCommands(context.config.lock1, 'lock', unlock)
    
        } else {
        if
        console.log("Unlocking $lock1...")
        
        context.api.devices.sendCommands(context.config.lock1, 'lock', unlock)
    
        let delay = minutesLater * 60
        this.runIn(delay, lockDoor)
        } else {
        if
        this.unschedule(lockDoor)
        console.log("Unlocking $lock1...")
        
        context.api.devices.sendCommands(context.config.lock1, 'lock', unlock)
    
        } else {
        if
        this.unschedule(lockDoor)
        console.log("Unlocking $lock1...")
        
        context.api.devices.sendCommands(context.config.lock1, 'lock', unlock)
    
        } else {
        console.log("Problem with $lock1, the lock might be jammed!")
        this.unschedule(lockDoor)
        this.unschedule(unlockDoor)
        }
        }
        }
        }
        }
        }
        }
        }
        

	})
