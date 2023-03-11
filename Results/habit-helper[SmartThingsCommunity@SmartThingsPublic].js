
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Remind me about...', section => {
            section.textSetting('message1').name('What?');

        });


        page.section('At what time?', section => {
            section.timeSetting('time1').name('When?');

        });


        page.section('Text me at...', section => {

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('scheduleCheck', delay);

    })

    .scheduledEventHandler('scheduleCheck', (context, event) => {
        
        log.trace('scheduledCheck')
        let message = message1 ? message1 : 'SmartThings - Habit Helper Reminder!'
        if (location.contactBookEnabled) {
        console.log("Texting reminder to contacts:${recipients?.size()}")
        this.sendNotificationToContacts(message, recipients)
        } else {
        console.log('Texting reminder')
        this.sendSms(phone1, message)
        }
        

	})
