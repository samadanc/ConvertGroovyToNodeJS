
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Config', section => {
            section.deviceSetting('whichDoors').capability(['lock']).name('Which locks?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.whichDoors, 'lock', 'lock.unlocked', 'onUnlock')

    })

    .subscribedEventHandler('onUnlock', (context, event) => {
        
        this.setLocationMode(whatMode)
        

	})
