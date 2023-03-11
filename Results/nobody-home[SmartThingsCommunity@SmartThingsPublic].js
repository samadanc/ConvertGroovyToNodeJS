
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When all of these people leave home', section => {
            section.deviceSetting('people').capability(['presenceSensor']).name('');

        });


        page.section('Change to this mode to...', section => {

        });


        page.section('Away threshold (defaults to 10 min)', section => {

        });


        page.section('Notifications', section => {
            section.enumSetting('sendPushMessage').name('Send a push notification?');

        });


    })
