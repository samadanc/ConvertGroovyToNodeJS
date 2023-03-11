
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Monitor...', section => {
            section.deviceSetting('thermostats').capability(['thermostat']).name('');

        });


        page.section('Notifications', section => {
            section.enumSetting('sendPushMessage').name('Send a push notification?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'mode', 'modeChangeHandler')

    })

    .subscribedEventHandler('modeChangeHandler', (context, event) => {
        
        let locMode = event.value
        console.log("Mode has changed $locMode")
        for (let t : thermostats ) {
        console.log("Set $t locModeTemp")
        t.setToLocModeTemp()
        this.send("Location mode has changed, setting $t to $locMode temp")
        }
        

	})
