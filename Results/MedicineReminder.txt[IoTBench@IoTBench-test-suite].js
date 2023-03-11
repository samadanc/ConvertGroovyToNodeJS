
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Choose your medicine cabinet...', section => {
            section.deviceSetting('cabinet1').capability(['contactSensor']).name('Where?');

        });


        page.section('Take my medicine at...', section => {
            section.timeSetting('time1').name('When?');

        });


        page.section('Text me if I forget...', section => {

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('scheduleCheck', delay);

    })

    .scheduledEventHandler('scheduleCheck', (context, event) => {
        
        log.trace("medicineCheck: $settings")
        let midnight = new Date().clearTime()
        let now = new Date()
        
        context.api.devices.sendCommands(context.config.cabinet1, 'contactSensor', eventsBetween)
    
        log.trace("Found ${(cabinetEvents?.size()) ? cabinetEvents?.size() : 0} cabinet events since $midnight")
        let cabinetOpened = cabinetEvents.count({
        it.value && it.value == 'open'
        }) > 0
        if (cabinetOpened) {
        console.log("Medicine cabinet was opened since $midnight, no SMS required")
        } else {
        console.log("Medicine cabinet was not opened since $midnight, texting $phone1")
        this.sendSms(phone1, 'Please remember to take your medicine')
        }
        

	})
