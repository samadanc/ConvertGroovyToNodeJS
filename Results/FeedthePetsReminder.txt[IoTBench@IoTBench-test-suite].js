
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Choose the pet cabinet...', section => {
            section.deviceSetting('cabinet1').capability(['contactSensor']).name('Where?');

        });


        page.section('Feed my pet between...', section => {
            section.timeSetting('tweenStart').name('Start Time');
            section.timeSetting('tweenEnd').name('End Time');

        });


        page.section('Text me if I forget...(Optional, will use push message if no number entered)', section => {

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('scheduleCheck', delay);

    })

    .scheduledEventHandler('scheduleCheck', (context, event) => {
        
        log.trace('scheduledCheck')
        let midnight = new Date().clearTime()
        let t0 = this.now()
        let startTime = this.timeToday(tweenStart)
        let endTime = this.timeToday(tweenEnd)
        
        context.api.devices.sendCommands(context.config.cabinet1, 'contactSensor', eventsBetween)
    
        if (t0 >= startTime.time) {
        log.trace("Found ${(cabinetEvents?.size()) ? cabinetEvents?.size() : 0} cabinet events since $startTime")
        let cabinetOpened = cabinetEvents.count({
        it.value && it.value == 'open'
        }) > 0
        if (cabinetOpened) {
        console.log("Cabinet was opened since $startTime")
        if (phone) {
        this.sendSms(phone, "The $label has been fed, yay!")
        } else {
        this.send("The $label has been fed, yay!")
        }
        } else {
        console.log("Cabinet was not opened since $startTime, texting $phone1")
        if (phone) {
        this.sendSms(phone, "No one has fed the $label")
        } else {
        this.send("No one has fed the $label")
        }
        }
        }
        

	})
