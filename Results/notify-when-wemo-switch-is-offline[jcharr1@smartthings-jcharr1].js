
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select Switch', section => {
            section.deviceSetting('theSwitch').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.theSwitch, 'switch', 'switch.offline', 'offlineHandler')

    })

    .subscribedEventHandler('offlineHandler', (context, event) => {
        
        console.log("Switch offline: ${event.value}")
        this.sendPush("${theSwitch.displayName} is now ${event.value}. Might want to check the breaker.")
        

	})
