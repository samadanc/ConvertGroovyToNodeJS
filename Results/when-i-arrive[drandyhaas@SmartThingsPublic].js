
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When I arrive...', section => {
            section.deviceSetting('presence1').capability(['presenceSensor']).name('Who?');

        });


        page.section('Unlock the lock...', section => {
            section.deviceSetting('lock1').capability(['lock']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.presence1, 'presenceSensor', 'presence.present', 'presence')

    })

    .subscribedEventHandler('presence', (context, event) => {
        
        log.info("presence detected: $evt ")
        this.sendPush('Presence detected')
        if (lock1) {
        log.info('checking locks...')
        let anyLocked = lock1.count({
        it.currentLock == 'unlocked'
        
        context.api.devices.sendCommands(context.config.lock1, 'lock', size)
    
        if (anyLocked) {
        log.info('unlocking locks')
        this.sendPush("Unlocked door due to arrival of ${event.displayName}")
        
        context.api.devices.sendCommands(context.config.lock1, 'lock', unlock)
    
        }
        }
        

	})
