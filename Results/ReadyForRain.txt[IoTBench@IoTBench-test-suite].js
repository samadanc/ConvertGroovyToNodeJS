
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Zip code?', section => {
            section.textSetting('zipcode').name('Zipcode?');

        });


        page.section('Things to check?', section => {
            section.deviceSetting('sensors').capability(['contactSensor']).name('');

        });


        page.section('Notifications?', section => {
            section.enumSetting('sendPushMessage').name('Send a push notification?');

        });


        page.section('Message interval?', section => {
            section.numberSetting('messageDelay').name('Minutes (default to every message)');

        });


    })
