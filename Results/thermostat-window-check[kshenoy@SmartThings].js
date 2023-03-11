
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Things to check?', section => {
            section.deviceSetting('sensors').capability(['contactSensor']).name('');

        });


        page.section('Thermostats to monitor', section => {
            section.deviceSetting('thermostats').capability(['thermostat']).name('');

        });


        page.section('Notifications', section => {
            section.enumSetting('sendPushMessage').name('Send a push notification?');

        });


        page.section('Delay to wait before sending notification. (defaults to 30 seconds)', section => {

        });


        page.section('Turn thermostat off automatically?', section => {
            section.enumSetting('turnOffTherm').name('');

        });


        page.section('Delay to wait before turning thermostat off (defaults to 1 minute)', section => {

        });


    })
