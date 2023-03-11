
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select the door lock:', section => {
            section.deviceSetting('thelock').capability(['lock']).name('');

        });


        page.section('Select the door contact sensor:', section => {
            section.deviceSetting('thesensor').capability(['contactSensor']).name('');

        });


        page.section('Select notification devices after all locking attempts fail:', section => {
            section.deviceSetting('notifications').capability(['notification']).name('');

        });


        page.section('Enable debug logging:', section => {
            section.booleanSetting('enableDebug').name('Enable?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.thelock, 'lock', 'lock.locked', 'lockHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.thelock, 'lock', 'lock.unlocked', 'unlockHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.thesensor, 'contactSensor', 'contact.closed', 'closeHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.thesensor, 'contactSensor', 'contact.open', 'openHandler')

    })

    .subscribedEventHandler('closeHandler', (context, event) => {
        
        this.lockTheDoor()
        this.scheduleLockingTasks()
        

	})

    .subscribedEventHandler('lockHandler', (context, event) => {
        
        this.unschedule(lockTheDoor)
        this.unschedule(refreshLock)
        this.unschedule(notifyOnFailure)
        

	})

    .subscribedEventHandler('unlockHandler', (context, event) => {
        
        state.canLock = false
        this.runIn(11, allowLockAndLockTheDoor)
        if
        this.scheduleLockingTasks()
        }
        

	})

    .subscribedEventHandler('openHandler', (context, event) => {
        
        this.unscheduleLockingTasks()
        

	})
