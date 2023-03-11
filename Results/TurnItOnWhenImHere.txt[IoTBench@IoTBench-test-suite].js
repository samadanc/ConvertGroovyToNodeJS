
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When I arrive and leave...', section => {
            section.deviceSetting('presence1').capability(['presenceSensor']).name('Who?');

        });


        page.section('Turn on/off a light...', section => {
            section.deviceSetting('switch1').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.presence1, 'presenceSensor', 'presence', 'presenceHandler')

    })

    .subscribedEventHandler('presenceHandler', (context, event) => {
        
        let current = event.value
        if (current == 'present') {
        settings.switch1.on
        } else {
        if (current == 'not present') {
        settings.switch1.off
        }
        }
        

	})
