
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When I leave...', section => {
            section.deviceSetting('presence1').capability(['presenceSensor']).name('Who?');

        });


        page.section('Check the lock...', section => {
            section.deviceSetting('lock1').capability(['lock']).name('');
            section.enumSetting('spam').name('Send Me Notifications?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.presence1, 'presenceSensor', 'presence', 'presence')

    })

    .subscribedEventHandler('presence', (context, event) => {
        
        let nobodyHome = presence1.find({
        it.currentPresence == 'present'
        }) == null
        if (nobodyHome) {
        let anyUnlocked = lock1.count({
        it.currentLock == 'locked'
        
        context.api.devices.sendCommands(context.config.lock1, 'lock', size)
    
        if (anyUnlocked) {
        log.trace("${event.value}: $evt, $settings")
        console.log("Everyone left and the $lock1 is unlocked, sending push message to user")
        this.sendMessage("You left the $lock1 unlocked!")
        }
        
        context.api.devices.sendCommands(context.config.lock1, 'lock', lock)
    
        }
        

	})
