
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Choose lock(s)', section => {
            section.deviceSetting('lock1').capability(['lock']).name('');

        });


        page.section('After this many minutes', section => {
            section.numberSetting('after').name('Minutes');

        });


        page.section('While I\'m present', section => {
            section.deviceSetting('presence1').capability(['presenceSensor']).name('Who?');

        });


        page.section('Notification method', section => {
            section.booleanSetting('push').name('Push notification');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.lock1, 'lock', 'lock', 'eventHandler')

    })

    .subscribedEventHandler('eventHandler', (context, event) => {
        
        let delay = after != null && after != '' ? after * 60 : 600
        this.runIn(delay, lockTheLocks)
        console.log("runIn($delay, lockTheLocks)")
        

	})
