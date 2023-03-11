
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select Garage Door', section => {
            section.deviceSetting('garageDoor').capability(['contactSensor']).name('');
            section.timeSetting('theTime').name('Time to execute every day');

        });


        page.section('Send Notifications?', section => {

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('dailyCheck', delay);

    })

    .scheduledEventHandler('dailyCheck', (context, event) => {
        
        console.log("recipients configured: $recipients")
        let currentContact = garageDoor.currentContact
        console.log("currentContact: $currentContact")
        this.sendSms(phone, "Garage door is $currentContact")
        if (phone2) {
        this.sendSms(phone2, "Garage door is $currentContact")
        }
        

	})
