
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Zip code...', section => {
            section.textSetting('zipcode').name('Zipcode?');

        });


        page.section('Check at...', section => {
            section.timeSetting('time').name('When?');

        });


        page.section('Things to check...', section => {
            section.deviceSetting('sensors').capability(['contactSensor']).name('');

        });


        page.section('Text me if I anything is open...', section => {

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('scheduleCheck', delay);

    })

    .scheduledEventHandler('scheduleCheck', (context, event) => {
        
        let response = this.getWeatherFeature('forecast', zipcode)
        if (this.isStormy(response)) {
        let open = sensors.findAll({
        it?.latestValue('contact') == 'open'
        })
        if (open) {
        if (location.contactBookEnabled) {
        this.sendNotificationToContacts("A storm is a coming and the following things are open: ${open.join(, )}", recipients)
        } else {
        this.sendSms(phone, "A storm is a coming and the following things are open: ${open.join(, )}")
        }
        }
        }
        

	})
