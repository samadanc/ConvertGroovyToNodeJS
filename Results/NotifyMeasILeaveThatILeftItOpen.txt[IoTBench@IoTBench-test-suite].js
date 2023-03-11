
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('As this device leaves', section => {
            section.deviceSetting('departer').capability(['presenceSensor']).name('Presence sensor');
            section.numberSetting('openThreshold').name('Delay before considered gone (default: immediately)');

        });


        page.section('Check that this is closed', section => {
            section.deviceSetting('contact').capability(['contactSensor']).name('Contact sensor');

        });


        page.section('Message to send', section => {
            section.textSetting('message').name('Message (optional)');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.departer, 'presenceSensor', 'presence', 'departerLeft')

    })

    .subscribedEventHandler('departerLeft', (context, event) => {
        
        if (event.value == 'not present') {
        log.trace("departerLeft(${event.name}: ${event.value}) ${departer.displayName}")
        let t0 = this.now()
        let delay = openThreshold != null && openThreshold != '' ? openThreshold * 60 : 0
        let departer = evt
        this.runIn(delay, doorOpenTooLong, ['overwrite': false])
        }
        

	})
