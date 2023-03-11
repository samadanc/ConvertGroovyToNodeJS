
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Auto lock when door is unlocked:', section => {
            section.deviceSetting('theLock').capability(['lock']).name('Which lock?');

        });


        page.section('Auto lock after a certain amount of time:', section => {
            section.numberSetting('minutesLater').name('Minutes?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.theLock, 'lock', 'lock.unlocked', 'unlockedDetectedHandler')

    })

    .subscribedEventHandler('unlockedDetectedHandler', (context, event) => {
        
        console.log("unlockedDetectedHandler called: $evt")
        let delay = minutesLater * 60
        console.log("Turning off in $minutesLater minutes ($delayseconds)")
        this.runIn(delay, lockDoor)
        

	})
