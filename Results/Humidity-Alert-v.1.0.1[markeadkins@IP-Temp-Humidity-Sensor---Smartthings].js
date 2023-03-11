
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Monitor the humidity of:', section => {
            section.deviceSetting('humiditySensor1').capability(['relativeHumidityMeasurement']).name('');

        });


        page.section('When the humidity rises above:', section => {
            section.numberSetting('humidity1').name('Percentage ?');

        });


        page.section('When the humidity falls below:', section => {
            section.numberSetting('humidity2').name('Percentage ?');

        });


        page.section('Notifications', section => {
            section.enumSetting('sendPushMessage').name('Send a push notification?');

        });


        page.section('Control this switch:', section => {
            section.deviceSetting('switch1').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.runEvery5Minutes('kickOffRefresh', delay);

    })

    .scheduledEventHandler('kickOffRefresh', (context, event) => {
        
        console.log('Kicked off Refresh')
        this.sendSms(phone1, 'Refreshed Kicked Off')
        this.subscribe(humiditySensor1, 'humidity', humidityHandler)
        

	})
