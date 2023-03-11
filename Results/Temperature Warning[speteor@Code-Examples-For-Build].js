
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Temperature Sensors', section => {
            section.deviceSetting('exSensor').capability(['temperatureMeasurement']).name('Choose Sensor');

        });


        page.section('Temperature ', section => {

        });


        page.section('Contacting You', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.exSensor, 'temperatureMeasurement', 'temperature', 'eTemperatureHandler')

    })

    .subscribedEventHandler('eTemperatureHandler', (context, event) => {
        
        if (exTemp > maxTemp ) {
        if (freq) {
        this.schedule("0 0/$freq * * * ?", sendNotifHi)
        } else {
        this.sendNotifHi()
        }
        } else {
        if (exTemp < minTemp ) {
        if (freq) {
        this.schedule("0 0/$freq * * * ?", sendNotifLo)
        } else {
        this.sendNotifLo()
        }
        }
        }
        

	})
