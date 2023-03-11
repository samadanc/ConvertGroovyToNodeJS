
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When any of these locks...', section => {
            section.deviceSetting('doorLock').capability(['lock']).name('Lock?');

        });


        page.section('Changes to this status...', section => {
            section.enumSetting('lockStatus').name('Status?');

        });


        page.section('Change to this mode.', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.doorLock, 'lock', 'lock', 'onLockChange')

    })

    .subscribedEventHandler('onLockChange', (context, event) => {
        
        console.log('Lock status has been changed.', {
        log.info("Set mode to $newMode.")
        this.setLocationMode(newMode)
        })
        

	})
