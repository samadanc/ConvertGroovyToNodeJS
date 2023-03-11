
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Presence sensors to monitor', section => {
            section.deviceSetting('people').capability(['presenceSensor']).name('');

        });


        page.section('Mode setting', section => {

        });


        page.section('Mode change delay (minutes)', section => {

        });


        page.section('Notifications', section => {
            section.booleanSetting('sendPushMessage').name('Push notification');

        });


    })
