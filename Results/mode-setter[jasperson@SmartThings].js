
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Presence Sensors', section => {
            section.deviceSetting('people').capability(['presenceSensor']).name('');

        });


        page.section('Mode Settings', section => {

        });


        page.section('Mode Change Delay (minutes)', section => {

        });


        page.section('Notifications', section => {
            section.booleanSetting('sendPushMessage').name('Push notification');

        });


    })
