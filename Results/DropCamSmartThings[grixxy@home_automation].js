
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When all of these people leave home', section => {
            section.deviceSetting('people').capability(['presenceSensor']).name('');
            section.textSetting('username').name('Username');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.people, 'presenceSensor', 'presence', 'presenceHandler')

    })

    .subscribedEventHandler('presenceHandler', (context, event) => {
        
        console.log("event.name: ${event.value}")
        console.log('checking if everyone is away')
        if (this.everyoneIsAway()) {
        this.turnCameraOn('true')
        } else {
        this.turnCameraOn('false')
        }
        

	})
