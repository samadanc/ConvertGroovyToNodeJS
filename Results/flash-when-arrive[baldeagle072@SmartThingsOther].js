
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Preferences', section => {
            section.deviceSetting('people').capability(['presenceSensor']).name('Who?');
            section.deviceSetting('switches').capability(['switch']).name('Flash which light?');
            section.numberSetting('flashNum').name('Flash how many times?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.people, 'presenceSensor', 'presence', 'presenceHandler')

    })

    .subscribedEventHandler('presenceHandler', (context, event) => {
        
        console.log(event.value)
        if (event.value == 'present') {
        this.flashLights()
        }
        

	})
