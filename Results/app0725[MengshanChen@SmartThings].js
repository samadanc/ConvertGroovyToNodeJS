
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Lock', section => {
            section.deviceSetting('lock').capability(['lock']).name('Door lock');

        });


        page.section('Notifications', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.lock, 'lock', 'lock.unlock', 'eventHandler')

    })

    .subscribedEventHandler('eventHandler', (context, event) => {
        
        console.log("Notify got evt $evt")
        if (frequency) {
        let lastTime = state[event.deviceId]
        if (lastTime == null || this.now() - lastTime >= frequency * 60000) {
        this.sendMessage(evt)
        }
        } else {
        this.sendMessage(evt)
        }
        

	})
