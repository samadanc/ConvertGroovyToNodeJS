
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When there\'s water detected...', section => {
            section.deviceSetting('waterSensors').capability(['waterSensor']).name('');

        });


        page.section('Send SmartThings Notification (optional)', section => {
            section.enumSetting('pushNotification').name('Send SmartThings Notification?');

        });


        page.section('Send SMS Message to (optional)', section => {

        });


        page.section('Send Pushover Notification (optional)', section => {
            section.textSetting('apiKey').name('Pushover API Key');
            section.textSetting('userKey').name('Pushover User Key');
            section.textSetting('deviceName').name('Pushover Device Name');
            section.enumSetting('priority').name('Pushover Priority');
            section.enumSetting('sound').name('Pushover Alert Sound');

        });


    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('waterEvent', (context, event) => {
        
        let deltaSeconds = 120
        let evtState = event.value
        let devName = 'UNKNOWN'
        let device = null
        console.log("${event.name}: ${event.value}")
        waterSensors.each({
        if (it.id == event.deviceId) {
        device = it
        }
        })
        if (device == null) {
        console.log('waterEventHandler: BUG - no device associaed with event!!')
        return null
        } else {
        devName = device.displayName
        }
        let msg = "$devName is $evtState!"
        let messageText = "Flood Alert! [$msg]"
        if (phone) {
        if (this.alreadyNotified(device, evtState, event.isoDate, deltaSeconds) > 0) {
        console.log("SMS message for sensor=$devName state=$evtState already sent within the last $deltaSeconds seconds")
        } else {
        console.log("$devName is $evtState, sending SMS to $phone")
        this.sendSms(phone, messageText)
        }
        }
        deltaSeconds = 10
        if (this.alreadyNotified(device, evtState, event.isoDate, deltaSeconds) > 0) {
        console.log("push notification for sensor=$devName state=$evtState already sent within the last $deltaSeconds seconds")
        } else {
        if (pushNotification == 'Yes') {
        console.log('Sending SmartThings Notification')
        this.sendPush(messageText)
        } else {
        console.log('Skipping SmartThings Notification')
        }
        }
        if (this.alreadyNotified(device, evtState, event.isoDate, deltaSeconds) > 0) {
        console.log("Pushover notification for sensor=$devName state=$evtState already sent within the last $deltaSeconds seconds")
        } else {
        if (apiKey && userKey ) {
        console.log("$devName is $evtState, sending Pushover notification")
        let postBody = []
        let pushPriority = 0
        pushPriority = state.priorityMap[ priority ]
        console.log("priority = $pushPriority")
        console.log("sound = $sound")
        if (deviceName) {
        console.log("Sending Pushover to Device: $deviceName")
        if (pushPriority == 2) {
        postBody = ['token': "$apiKey", 'user': "$userKey", 'device': "$deviceName", 'message': "$messageText", 'priority': "$pushPriority", 'retry': '60', 'expire': '3600', 'sound': "$sound"]
        } else {
        postBody = ['token': "$apiKey", 'user': "$userKey", 'device': "$deviceName", 'message': "$messageText", 'priority': "$pushPriority", 'sound': "$sound"]
        }
        console.log(postBody)
        } else {
        console.log('Sending Pushover to All Devices')
        if (pushPriority == 2) {
        postBody = ['token': "$apiKey", 'user': "$userKey", 'message': "$messageText", 'priority': "$pushPriority", 'retry': '60', 'expire': '3600']
        } else {
        postBody = ['token': "$apiKey", 'user': "$userKey", 'message': "$messageText", 'priority': "$pushPriority"]
        }
        console.log(postBody)
        }
        let params = ['uri': 'https://api.pushover.net/1/messages.json', 'body': postBody ]
        this.httpPost(params, { let response ->
        console.log("Response Received: Status [${response.status}]")
        if (response.status != 200) {
        this.sendPush('Received HTTP Error Response. Check Install Parameters.')
        }
        })
        }
        }
        

	})
