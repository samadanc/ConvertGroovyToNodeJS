
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

        await context.api.subscriptions.subscribeToDevices(context.config.lock1, 'lock', 'lock', 'doorUnlockedHandler')

    })

    .subscribedEventHandler('doorUnlockedHandler', (context, event) => {
        
        console.log("Lock $lock1 was: ${event.value}")
        if (event.value == 'lock') {
        this.unschedule(lockDoor)
        }
        if (event.value == 'unlocked') {
        console.log("Locking in $minutesLater minutes ($delayms)")
        let delay = minutesLater * 60
        this.runIn(delay, lockDoor)
        }
        

	})
