
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Who are you checking on?', section => {
            section.textSetting('person1').name('Name?');

        });


        page.section('If there\'s no movement (optional, leave blank to not require)...', section => {
            section.deviceSetting('motion1').capability(['motionSensor']).name('Where?');

        });


        page.section('or a door or cabinet hasn\'t been opened (optional, leave blank to not require)...', section => {
            section.deviceSetting('contact1').capability(['contactSensor']).name('');

        });


        page.section('between these times...', section => {
            section.timeSetting('time0').name('From what time?');
            section.timeSetting('time1').name('Until what time?');

        });


        page.section('then alert the following people...', section => {

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('scheduleCheck', delay);

    })

    .scheduledEventHandler('scheduleCheck', (context, event) => {
        
        if (this.noRecentContact() && this.noRecentMotion()) {
        let person = person1 ? person1 : 'your elder'
        let msg = "Alert! There has been no activity at $person's place $timePhrase"
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
