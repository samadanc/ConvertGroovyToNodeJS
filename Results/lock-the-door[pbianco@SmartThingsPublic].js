
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('What lock', section => {
            section.deviceSetting('lock1').capability(['lock']).name('');

        });


        page.section('Lock the door in ...', section => {
            section.numberSetting('delayMinutes').name('Minutes?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.lock1, 'lock', 'lock', 'lockHandler')

    })

    .subscribedEventHandler('lockHandler', (context, event) => {
        
        console.log("${event.name}: ${event.value}")
        if (event.value == 'unlocked') {
        console.log("Door will lock in $delayMinutes seconds")
        this.runIn(delayMinutes * 60, lockDoorAfterDelay, ['overwrite': false])
        console.log('The door is unlocked')
        }
        if (event.value == 'locked') {
        console.log('The door is locked')
        }
        

	})
