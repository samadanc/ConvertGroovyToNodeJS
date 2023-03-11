
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Temperatures to monitor', section => {
            section.deviceSetting('temperatures').capability(['temperatureMeasurement']).name('Temperatures: ');

        });


        page.section('Contacts to monitor', section => {
            section.deviceSetting('contacts').capability(['contactSensor']).name('Contacts: ');

        });


        page.section('Check Every', section => {
            section.enumSetting('hours').name('Hours: ');

        });


        page.section('Notifications', section => {
            section.enumSetting('sendPushMessage').name('Send a Push Notification?');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('handlerMethod', delay);

    })

    .scheduledEventHandler('handlerMethod', (context, event) => {
        
        let hourInt = 24
        switch ( hours ) {
        case '24':
        hourInt = 24
        break
        case '48':
        hourInt = 48
        break
        case '72':
        hourInt = 72
        break
        case '96':
        hourInt = 96
        break
        }
        temperatures.each({ let temp ->
        this.checkDevice(temp, 'temperature', hourInt)
        })
        contacts.each({ let contact ->
        this.checkDevice(contact, 'contact', hourInt)
        })
        

	})
