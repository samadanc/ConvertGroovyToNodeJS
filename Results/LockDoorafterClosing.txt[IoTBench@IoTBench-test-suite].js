
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
        
        console.log("Event: The ${event.name} is ${event.value}.")
        
        context.api.devices.sendCommands(context.config.contact, 'contactSensor', log)
    
        
        context.api.devices.sendCommands(context.config.lock1, 'lock', log)
    
        if
        let delay = minutesLater2 * 60
        console.log('Door is open and somebody just locked it.  Unlocking the door!')
        this.runIn(delay, unlockDoor)
        } else {
        if
        console.log('Cancel the current task. Door is open and somebody just unlocked it!')
        this.unschedule(unlockDoor)
        } else {
        if
        console.log('Cancel the current task. Door is closed and somebody just locked it!')
        this.unschedule(lockDoor)
        } else {
        if
        console.log('Door is closed and somebody just unlocked it.  Locking the door!')
        let delay = minutesLater * 60
        console.log("Re-arming lock in $minutesLater minutes ($delays).")
        this.runIn(delay, lockDoor)
        } else {
        if
        console.log('Cancel the current task. Door is unlocked and somebody just opened it!')
        this.unschedule(lockDoor)
        } else {
        if
        console.log('Door is unlocked and somebody just closed it.  Locking the door!')
        let delay = minutesLater * 60
        console.log("Re-arming lock in $minutesLater minutes ($delays).")
        this.runIn(delay, lockDoor)
        } else {
        console.log('Ohh.. no!!.. The lock is jammed!!  or worst.. The door was forced open or close!!!')
        this.unschedule(lockDoor)
        this.unschedule(unlockDoor)
        }
        }
        }
        }
        }
        }
        

	})
