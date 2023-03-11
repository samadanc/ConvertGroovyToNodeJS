
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Humidity Sensor', section => {
            section.deviceSetting('humiditySensor').capability(['relativeHumidityMeasurement']).name('Choose Humidity Sensor');

        });


        page.section('Bathroom Fan', section => {
            section.deviceSetting('bathroomFan').capability(['switch']).name('Choose Bathroom Fan Switch');

        });


        page.section('Alerting', section => {
            section.booleanSetting('sendPushMessage').name('Push notifications');

        });


    })

    .updated(async (context, updateData) => {

    })
