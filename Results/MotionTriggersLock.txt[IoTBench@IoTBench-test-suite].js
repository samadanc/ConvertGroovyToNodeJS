
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When there\'s movement...', section => {
            section.deviceSetting('motion1').capability(['motionSensor']).name('Where?');

        });


        page.section('Unlock the lock...', section => {
            section.deviceSetting('lock1').capability(['lock']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.motion1, 'motionSensor', 'motion.active', 'motionActiveHandler')

    })

    .subscribedEventHandler('motionActiveHandler', (context, event) => {
        
        let anyLocked = lock1.count({
        it.currentLock == 'unlocked'
        
        context.api.devices.sendCommands(context.config.lock1, 'lock', size)
    
        if (anyLocked) {
        this.sendPush("Unlocked door due to arrival of ${event.displayName}")
        
        context.api.devices.sendCommands(context.config.lock1, 'lock', unlock)
    
        }
        

	})
