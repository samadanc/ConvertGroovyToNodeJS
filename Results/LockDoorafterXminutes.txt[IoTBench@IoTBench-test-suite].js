
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Lock automatically', section => {
            section.deviceSetting('whichLock').capability(['lock']).name('Which lock?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.whichLock, 'lock', 'lock.unlocked', 'onUnlock')

    })

    .subscribedEventHandler('onUnlock', (context, event) => {
        
        console.log('Lock was unlocked, schedule locking')
        this.scheduleLock()
        

	})
