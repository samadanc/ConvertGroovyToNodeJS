
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When a door unlocks...', section => {
            section.deviceSetting('lock1').capability(['lock']).name('');

        });


        page.section('Lock it how many minutes later?', section => {
            section.numberSetting('minutesLater').name('When?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.lock1, 'lock', 'lock', 'doorHandler')

    })

    .subscribedEventHandler('doorHandler', (context, event) => {
        
        console.log("Lock ${event.displayName} is ${event.value}.")
        if (event.value == 'locked') {
        console.log("Cancelling previous lock task for ${event.displayName}...")
        this.unschedule()
        } else {
        if (event.value == 'unlocked') {
        let delay = minutesLater * 60
        console.log("Re-arming ${event.displayName} in $minutesLater minutes ($delays).")
        this.runIn(delay, this.lockDoor("${event.displayName}"))
        } else {
        log.warn("Value '${event.value}' for '${event.displayName}' has not been processed.")
        }
        }
        

	})
