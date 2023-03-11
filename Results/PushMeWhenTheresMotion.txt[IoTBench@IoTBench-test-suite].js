
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When movement is detected...', section => {
            section.deviceSetting('motionSensor').capability(['motionSensor']).name('Where?');

        });


        page.section('Send this message (optional, sends standard status message if not specified)', section => {
            section.textSetting('messageText').name('Message Text');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.motionSensor, 'motionSensor', 'motion.active', 'motionActiveHandler')

    })

    .subscribedEventHandler('motionActiveHandler', (context, event) => {
        
        let msg = messageText ? messageText : "Motion detected on $motionSensor sensor!"
        this.sendPush(msg)
        console.log("$motionSensor has moved")
        

	})
