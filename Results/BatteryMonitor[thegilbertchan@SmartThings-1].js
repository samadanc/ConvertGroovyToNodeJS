
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Battery Alarm Level', section => {
            section.numberSetting('alarmAt').name('Alert when below...');
            section.deviceSetting('batteryDevices').capability(['battery']).name('Which devices?');

        });


        page.section('Send Pushover alert (optional)', section => {
            section.textSetting('apiKey').name('Pushover API Key');
            section.textSetting('userKey').name('Pushover User Key');
            section.textSetting('deviceName').name('Pushover Device Name');
            section.enumSetting('priority').name('Pushover Priority');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('doBatteryCheck', delay);

    })

    .scheduledEventHandler('doBatteryCheck', (context, event) => {
        
        let belowLevelCntr = 0
        let pushMsg = ''
        for (let batteryDevice : batteryDevices ) {
        let batteryLevel = batteryDevice.currentValue('battery')
        if
        pushMsg += "${batteryDevice.name} named ${batteryDevice.label} is at: $batteryLevel%
        "
        belowLevelCntr++
        }
        }
        if (belowLevelCntr) {
        pushMsg = "You have $belowLevelCntr devices below the set alarm level.
        " + pushMsg
        } else {
        pushMsg = 'Battery Check App executed with no devices below alarm level'
        }
        console.log(pushMsg)
        if (apiKey && userKey ) {
        console.log("Sending Pushover with API Key [$apiKey] and User Key [$userKey]")
        let postBody = []
        let pushPriority = 0
        if (priority == 'Low') {
        pushPriority = -1
        } else {
        if (priority == 'Normal') {
        pushPriority = 0
        } else {
        if (priority == 'High') {
        pushPriority = 1
        } else {
        if (priority == 'Emergency') {
        pushPriority = 2
        }
        }
        }
        }
        if (deviceName) {
        console.log("Sending Pushover to Device: $deviceName")
        if (pushPriority == 2) {
        postBody = ['token': "$apiKey", 'user': "$userKey", 'device': "$deviceName", 'message': "$pushMsg", 'priority': "$pushPriority", 'retry': '60', 'expire': '3600']
        } else {
        postBody = ['token': "$apiKey", 'user': "$userKey", 'device': "$deviceName", 'message': "$pushMsg", 'priority': "$pushPriority"]
        }
        console.log(postBody)
        } else {
        console.log('Sending Pushover to All Devices')
        if (pushPriority == 2) {
        postBody = ['token': "$apiKey", 'user': "$userKey", 'message': "$pushMsg", 'priority': "$pushPriority", 'retry': '60', 'expire': '3600']
        } else {
        postBody = ['token': "$apiKey", 'user': "$userKey", 'message': "$pushMsg", 'priority': "$pushPriority"]
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
        } else {
        console.log(pushMsg)
        this.sendPush(pushMsg)
        }
        

	})
