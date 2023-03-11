
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('On for this amount of time', section => {
            section.numberSetting('minutes').name('Minutes?');

        });


        page.section('Temperature You want to turn on at.', section => {
            section.numberSetting('onTemperature').name('Temp?');

        });


        page.section('When does your quiet hours start?', section => {
            section.timeSetting('beforeBedNotificationTime').name('Time?');

        });


        page.section('When do you need your car to start?', section => {
            section.timeSetting('carStartTime').name('Time?');

        });


        page.section('Which Switch is your block heater plugged into?', section => {
            section.deviceSetting('switches').capability(['switch']).name('');

        });


        page.section('Temperature Sensor', section => {
            section.deviceSetting('bwsTemperatureMeasurement').capability(['temperatureMeasurement']).name('');

        });


        page.section('Notifications', section => {
            section.enumSetting('sendPushMessage').name('Send a push notification?');

        });


    })
