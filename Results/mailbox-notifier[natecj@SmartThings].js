
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select the sensor that detects the mailbox being open/closed', section => {
            section.deviceSetting('contact').capability(['contactSensor']).name('Sensor');

        });


        page.section('Notifications', section => {
            section.enumSetting('sendPushMessage').name('Send a push notification?');

        });


        page.section('Minimum time between messages (optional, defaults to every message)', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.contact, 'contactSensor', 'contact.open', 'eventHandler')

    })

    .subscribedEventHandler('eventHandler', (context, event) => {
        
        let message = this.defaultText(evt)
        if (frequency) {
        let lastTime = state[event.deviceId]
        if (lastTime == null || this.now() - lastTime >= frequency * 60000) {
        this.sendMessage(message)
        state[event.deviceId] = this.now()
        }
        } else {
        this.sendMessage(message)
        }
        

	})
