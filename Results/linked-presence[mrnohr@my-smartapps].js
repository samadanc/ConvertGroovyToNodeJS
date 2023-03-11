
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Presence Sensors', section => {
            section.deviceSetting('sensorDependant').capability(['presenceSensor']).name('When this person leaves alone');
            section.deviceSetting('sensorMain').capability(['presenceSensor']).name('Without this person');
            section.numberSetting('timeDelay').name('With this delay (minutes)');

        });


        page.section('Alerts', section => {
            section.deviceSetting('switches').capability(['switch']).name('Turn on some lights?');
            section.enumSetting('sendPushMessage').name('Send a push notification?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.sensorDependant, 'presenceSensor', 'presence.not present', 'leavingHandler')

    })

    .subscribedEventHandler('leavingHandler', (context, event) => {
        
        if (timeDelay > 0) {
        console.log("scheduling presence check for $timeDelay minute(s)")
        this.runIn(timeDelay * 60, 'checkOtherPresence')
        } else {
        this.checkOtherPresence()
        }
        

	})
