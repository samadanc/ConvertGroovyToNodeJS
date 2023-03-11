
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Choose your pet feeder...', section => {
            section.deviceSetting('feeder1').capability(['contactSensor']).name('Where?');

        });


        page.section('Feed my pet at...', section => {
            section.timeSetting('time1').name('When?');

        });


        page.section('Text me if I forget...', section => {

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('scheduleCheck', delay);

    })

    .scheduledEventHandler('scheduleCheck', (context, event) => {
        
        log.trace('scheduledCheck')
        let midnight = new Date().clearTime()
        let now = new Date()
        
        context.api.devices.sendCommands(context.config.feeder1, 'contactSensor', eventsBetween)
    
        log.trace("Found ${(feederEvents?.size()) ? feederEvents?.size() : 0} feeder events since $midnight")
        let feederOpened = feederEvents.count({
        it.value && it.value == 'open'
        }) > 0
        if (feederOpened) {
        console.log("Feeder was opened since $midnight, no SMS required")
        } else {
        if (location.contactBookEnabled) {
        console.log("Feeder was not opened since $midnight, texting contacts:${recipients?.size()}")
        this.sendNotificationToContacts('No one has fed the dog', recipients)
        } else {
        console.log("Feeder was not opened since $midnight, texting one phone number")
        this.sendSms(phone1, 'No one has fed the dog')
        }
        }
        

	})
