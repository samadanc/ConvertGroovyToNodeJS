
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When I arrive...', section => {
            section.deviceSetting('motionSensor').capability(['motionSensor']).name('Where?');

        });


        page.section('Unlock the lock...', section => {
            section.deviceSetting('lock').capability(['lock']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.motionSensor, 'motionSensor', 'motion', 'motionHandler')

    })

    .subscribedEventHandler('motionHandler', (context, event) => {
        
        let anyLocked = lock.count({
        it.currentLock == 'unlocked'
        
        context.api.devices.sendCommands(context.config.lock, 'lock', size)
    
        if (anyLocked) {
        this.sendPush('Unlocked door due to AWESOMENESS')
        
        context.api.devices.sendCommands(context.config.lock, 'lock', unlock)
    
        }
        

	})
