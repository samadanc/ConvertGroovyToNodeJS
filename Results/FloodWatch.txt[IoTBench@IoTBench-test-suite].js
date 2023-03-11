
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When there\'s water detected...', section => {
            section.deviceSetting('waterSensors').capability(['waterSensor']).name('');

        });


        page.section('Also send a text to... (optional)', section => {

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
        if (phone) {
        if (this.alreadyNotified(device, evtState, event.isoDate, deltaSeconds) > 0) {
        console.log("SMS message for sensor=$devName state=$evtState already sent within the last $deltaSeconds seconds")
        } else {
        console.log("$devName is $evtState, sending SMS to $phone")
        this.sendSms(phone, msg)
        }
        }
        deltaSeconds = 10
        if (this.alreadyNotified(device, evtState, event.isoDate, deltaSeconds) > 0) {
        console.log("push notification for sensor=$devName state=$evtState already sent within the last $deltaSeconds seconds")
        } else {
        console.log("$devName is $evtState, sending push notification")
        this.sendPush(msg)
        }
        

	})
