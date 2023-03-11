
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('All Switchs link...', section => {
            section.deviceSetting('exclusifSwitchs').capability(['switch']).name('Switchs Link?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.exclusifSwitchs, 'switch', 'switch.on', 'onHandler')

    })

    .subscribedEventHandler('onHandler', (context, event) => {
        
        console.log('Events: ' + event.displayName)
        for (let switches : exclusifSwitchs ) {
        console.log('Switch: ' + switches.displayName)
        if (switches.displayName != event.displayName) {
        console.log('Turn Off')
        switches.off()
        }
        }
        

	})
