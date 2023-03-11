
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Check when motion detected:', section => {
            section.deviceSetting('themotion').capability(['motionSensor']).name('Where?');

        });


        page.section('Notify me if the door is closed', section => {
            section.deviceSetting('contact').capability(['contactSensor']).name('');

        });


        page.section('Send notification and/or text message', section => {
            section.enumSetting('sendPush').name('Push Notification');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.themotion, 'motionSensor', 'motion.active', 'motionDetectedHandler')

    })

    .subscribedEventHandler('motionDetectedHandler', (context, event) => {
        
        console.log("motionDetectedHandler called: $evt")
        this.checkDoor()
        

	})
