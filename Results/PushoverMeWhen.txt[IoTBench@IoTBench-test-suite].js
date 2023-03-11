
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Devices...', section => {
            section.deviceSetting('switches').capability(['switch']).name('Which Switches?');
            section.deviceSetting('motionSensors').capability(['motionSensor']).name('Which Motion Sensors?');
            section.deviceSetting('contactSensors').capability(['contactSensor']).name('Which Contact Sensors?');
            section.deviceSetting('presenceSensors').capability(['presenceSensor']).name('Which Presence Sensors?');
            section.deviceSetting('accelerationSensors').capability(['accelerationSensor']).name('Which Acceleration Sensors?');
            section.deviceSetting('locks').capability(['lock']).name('Which Locks?');

        });


        page.section('Application...', section => {
            section.enumSetting('push').name('SmartThings App Notification?');

        });


        page.section('Pushover...', section => {
            section.textSetting('apiKey').name('API Key');
            section.textSetting('userKey').name('User Key');
            section.textSetting('deviceName').name('Device Name (blank for all)');
            section.enumSetting('priority').name('Priority');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.locks, 'lock', 'lock', 'handler')

        await context.api.subscriptions.subscribeToDevices(context.config.motionSensors, 'motionSensor', 'motion', 'handler')

        await context.api.subscriptions.subscribeToDevices(context.config.switches, 'switch', 'switch', 'handler')

        await context.api.subscriptions.subscribeToDevices(context.config.contactSensors, 'contactSensor', 'contact', 'handler')

        await context.api.subscriptions.subscribeToDevices(context.config.accelerationSensors, 'accelerationSensor', 'acceleration', 'handler')

        await context.api.subscriptions.subscribeToDevices(context.config.presenceSensors, 'presenceSensor', 'presence', 'handler')

    })

    .subscribedEventHandler('handler', (context, event) => {
        
        console.log("${event.displayName} is ${event.value}")
        if (push == 'Yes') {
        this.sendPush("${event.displayName} is ${event.value} [Sent from 'Pushover Me When']")
        }
        let postBody = ['token': "$apiKey", 'user': "$userKey", 'message': "${event.displayName} is ${event.value}", 'priority': 0]
        switch ( priority ) {
        case 'Low':
        postBody['priority'] = -1
        break
        case 'High':
        postBody['priority'] = 1
        break
        case 'Emergency':
        postBody['priority'] = 2
        postBody['retry'] = '60'
        postBody['expire'] = '3600'
        break
        }
        if (deviceName) {
        console.log("Sending Pushover to Device: $deviceName")
        postBody['device'] = "$deviceName"
        } else {
        console.log('Sending Pushover to All Devices')
        }
        let params = ['uri': 'https://api.pushover.net/1/messages.json', 'body': postBody ]
        console.log(postBody)
        if (apiKey =~ '[A-Za-z0-9]{30}' && userKey =~ '[A-Za-z0-9]{30}') {
        console.log("Sending Pushover: API key '$apikey' | User key '$userkey'")
        this.httpPost(params, { let response ->
        if (response.status != 200) {
        this.sendPush("ERROR: 'Pushover Me When' received HTTP error ${response.status}. Check your keys!")
        log.error("Received HTTP error ${response.status}. Check your keys!")
        } else {
        console.log("HTTP response received [${response.status}]")
        }
        })
        } else {
        log.error("API key '$apiKey' or User key '$userKey' is not properly formatted!")
        }
        

	})
