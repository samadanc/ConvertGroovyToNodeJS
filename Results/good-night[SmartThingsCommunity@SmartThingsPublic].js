
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When there is no motion on any of these sensors', section => {
            section.deviceSetting('motionSensors').capability(['motionSensor']).name('Where?');

        });


        page.section('For this amount of time', section => {
            section.numberSetting('minutes').name('Minutes?');

        });


        page.section('After this time of day', section => {
            section.timeSetting('timeOfDay').name('Time?');

        });


        page.section('And (optionally) these switches are all off', section => {
            section.deviceSetting('switches').capability(['switch']).name('');

        });


        page.section('Change to this mode', section => {

        });


        page.section('Notifications', section => {
            section.enumSetting('sendPushMessage').name('Send a push notification?');

        });


    })
