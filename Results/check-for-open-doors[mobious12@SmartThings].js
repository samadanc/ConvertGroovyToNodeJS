
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Mode transition(s)', section => {

        });


        page.section('Check Once a day', section => {
            section.timeSetting('timeToCheck').name('(Optional)');

        });


        page.section('Doors to check', section => {
            section.deviceSetting('door').capability(['contactSensor']).name('Pick One');

        });


        page.section('Via a push notification and/or an SMS message', section => {
            section.enumSetting('pushAndPhone').name('Both Push and SMS?');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('checkDoor', delay);

    })

    .scheduledEventHandler('checkDoor', (context, event) => {
        
        console.log("Door ${door.displayName} is ${door.currentContact}")
        if (door.currentContact == 'open') {
        let msg = "${door.displayName} was left open!"
        log.info(msg)
        if (!phone || pushAndPhone != 'No') {
        console.log('sending push')
        this.sendPush(msg)
        }
        if (phone) {
        console.log('sending SMS')
        this.sendSms(phone, msg)
        } else {
        console.log('Check For Open Door: No Open Door')
        }
        }
        

	})
