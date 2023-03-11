
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Choose the presence sensor(s) you\'d like to monitor.', section => {
            section.deviceSetting('sensors').capability(['presenceSensor']).name('Which sensor(s) to monitor?');

        });


        page.section('Choose the thermostat to change when appropriate.', section => {

        });


        page.section('Choose the switches you\'d like to turn ON when all sensor(s) have left and OFF when one or more sensor has arrived.', section => {
            section.deviceSetting('switches').capability(['switch']).name('Which switches?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.sensors, 'presenceSensor', 'presence', 'presenceChangeHandler')

    })

    .subscribedEventHandler('presenceChangeHandler', (context, event) => {
        
        let current_presence = this.getCurrentPresence(false)
        if (current_presence[event.device.getLabel()] != event.value) {
        let parser = new JsonSlurper()
        let tracking_list = parser.parseText(appSettings.notification_sensors)
        if (tracking_list.contains(event.device.getLabel())) {
        let notification_list = parser.parseText(appSettings.notification_recipients)
        switch (event.value) {
        case 'present':
        notification_list.each({ let phone_number ->
        this.sendSms(phone_number, "${event.device.getLabel()} has arrived home.")
        })
        break
        case 'not present':
        notification_list.each({ let phone_number ->
        this.sendSms(phone_number, "${event.device.getLabel()} has left home.")
        })
        break
        }
        this.triggerPresenceChangeAction(evt)
        } else {
        this.triggerPresenceChangeAction(evt)
        }
        }
        

	})
