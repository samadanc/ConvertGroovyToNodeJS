
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Title', section => {
            section.deviceSetting('theSwitch').capability(['switch']).name('Switch?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.theSwitch, 'switch', 'switch.on', 'onHandler')

    })

    .subscribedEventHandler('onHandler', (context, event) => {
        
        console.log('Events: ' + event.displayName)
        let fireTime = new Date(new Date().time + delaySeconds * 1000)
        this.runOnce(fireTime, turnOffAfterDelay, ['overwrite': true])
        

	})
