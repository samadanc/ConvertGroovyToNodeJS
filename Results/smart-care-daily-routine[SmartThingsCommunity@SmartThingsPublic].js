
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('scheduleCheck', delay);

    })

    .scheduledEventHandler('scheduleCheck', (context, event) => {
        
                if (this.noRecentContact() && this.noRecentMotion()) {
                    let person = person1 ? person1 : 'your elder'
                    let msg = "Alert! There has been no activity at $person‘s place $timePhrase"
                    console.log(msg)
                    if (location.contactBookEnabled) {
                        this.sendNotificationToContacts(msg, recipients)
                    } else {
                        if (phone1) {
                            this.sendSms(phone1, msg)
                        } else {
                            this.sendPush(msg)
                        }
                    }
                } else {
                    console.log("There has been activity $timePhrase, not sending alert")
                }
            

	})
