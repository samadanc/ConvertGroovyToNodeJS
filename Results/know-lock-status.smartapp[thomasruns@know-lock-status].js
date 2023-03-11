
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select the door lock', section => {
            section.deviceSetting('lock1').capability(['lock']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.lock1, 'lock', 'unlock', 'checkLock')

        await context.api.subscriptions.subscribeToDevices(context.config.lock1, 'lock', 'lock', 'checkLock')

    })

    .subscribedEventHandler('checkLock', (context, event) => {
        
        if (event.value == 'locked') {
        this.sendPush("${settings.lock1} Locked")
        }
        if (event.value == 'unlocked') {
        this.sendPush("${settings.lock1} Unlocked")
        }
        

	})
