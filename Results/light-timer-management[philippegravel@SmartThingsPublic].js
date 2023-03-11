
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Time to and close the light(s)', section => {
            section.timeSetting('openTime').name('Open at');
            section.timeSetting('closeTime').name('Close at');

        });


        page.section('Active/Inactive', section => {

        });


        page.section('Send Notifications?', section => {

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('openHandler', delay);

        context.api.schedules.schedule('closeHandler', delay);

    })

    .scheduledEventHandler('closeHandler', (context, event) => {
        
        this.sendNotificationToContacts("${app.label} Close!", recipients)
        lights.off()
        

	})

    .scheduledEventHandler('openHandler', (context, event) => {
        
        this.sendNotificationToContacts("${app.label} Open!", recipients)
        lights.on()
        

	})
