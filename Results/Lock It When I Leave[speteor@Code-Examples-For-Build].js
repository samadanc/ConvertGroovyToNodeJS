
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When I Leave...', section => {
            section.deviceSetting('presence1').capability(['presenceSensor']).name('Who?');

        });


        page.section('Lock the lock...', section => {
            section.deviceSetting('lock1').capability(['lock']).name('');
            section.enumSetting('unlockit').name('Unlock when presence is detected?');
            section.enumSetting('spam').name('Send Me Notifications?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.presence1, 'presenceSensor', 'presence', 'presence')

    })

    .subscribedEventHandler('presence', (context, event) => {
        
        let presenceValue = presence1.find({
        it.currentPresence == 'present'
        })
        let lockValue = lock1.find({
        it.currentValue == 'unlocked'
        })
        if (unlockit == 'Yes') {
        if (presenceValue && !lockValue) {
        console.log("UnLock It = $unlockit and there is somebody home, and the door is locked, so we're unlocking the door.")
        
        context.api.devices.sendCommands(context.config.lock1, 'lock', unlock)
    
        this.sendNotif()
        } else {
        if (!presenceValue && lockValue ) {
        console.log("UnLock It = $unlockit and there is nobody home, and the door is unlocked, so we're locking the door.")
        
        context.api.devices.sendCommands(context.config.lock1, 'lock', unlock)
    
        this.sendNotif()
        }
        }
        } else {
        if (!presenceValue && lockValue ) {
        console.log("Lock It = $lockit and there is someone home, and the door is locked, so we're unlocking the door.")
        
        context.api.devices.sendCommands(context.config.lock1, 'lock', lock)
    
        this.sendNotif()
        } else {
        if (presenceValue && !lockValue) {
        console.log("Lock It = $lockit and there is nobody home, and the door is unlocked, so we're locking the door.")
        
        context.api.devices.sendCommands(context.config.lock1, 'lock', unlock)
    
        this.sendNotif()
        }
        }
        }
        

	})
