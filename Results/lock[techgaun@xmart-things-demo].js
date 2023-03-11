
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Allow external service to control these things?', section => {
            section.deviceSetting('locks').capability(['lock']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.locks, 'lock', 'lock', 'lockHandler')

    })

    .subscribedEventHandler('lockHandler', (context, event) => {
        
        console.log("got event with ${event.value}")
        

	})
