
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When I leave...', section => {
            section.deviceSetting('presence1').capability(['presenceSensor']).name('Who?');

        });


        page.section('Lock the lock...', section => {
            section.deviceSetting('lock1').capability(['lock']).name('');
            section.enumSetting('unlock').name('Unlock when presence is detected?');
            section.enumSetting('spam').name('Send Me Notifications?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.presence1, 'presenceSensor', 'presence', 'presence')

    })

    .subscribedEventHandler('presence', (context, event) => {
        
        if (event.value == 'present') {
        if (unlock == 'Yes') {
        let anyLocked = lock1.count({
        it.currentLock == 'unlocked'
        
        context.api.devices.sendCommands(context.config.lock1, 'lock', size)
    
        if (anyLocked) {
        this.sendMessage("Doors unlocked at arrival of ${event.linkText}")
        }
        
        context.api.devices.sendCommands(context.config.lock1, 'lock', unlock)
    
        }
        } else {
        let nobodyHome = presence1.find({
        it.currentPresence == 'present'
        }) == null
        if (nobodyHome) {
        let anyUnlocked = lock1.count({
        it.currentLock == 'locked'
        
        context.api.devices.sendCommands(context.config.lock1, 'lock', size)
    
        if (anyUnlocked) {
        this.sendMessage('Doors locked after everyone departed')
        }
        
        context.api.devices.sendCommands(context.config.lock1, 'lock', lock)
    
        }
        }
        

	})
