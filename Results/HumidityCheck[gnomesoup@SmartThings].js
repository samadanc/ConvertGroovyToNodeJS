
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When the humidity level changes on...', section => {
            section.deviceSetting('sensor1').capability(['relativeHumidityMeasurement']).name('Find a humidity sensor');

        });


        page.section('Control this device', section => {
            section.deviceSetting('switch1').capability(['switch']).name('Find a humidifier');

        });


        page.section('When the humidity level reaches...', section => {
            section.numberSetting('max').name('Turn off when humidity reaches');
            section.numberSetting('min').name('Turn on when humidity drops to');

        });


        page.section('Notifications', section => {
            section.enumSetting('sendPushMessage').name('Send a push notification?');

        });


    })
