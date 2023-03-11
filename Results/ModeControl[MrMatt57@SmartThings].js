
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Presence', section => {
            section.deviceSetting('people').capability(['presenceSensor']).name('Who to Monitor?');

        });


        page.section('Time of Day', section => {
            section.timeSetting('sleepTime').name('When should sleep mode start?');
            section.timeSetting('sleepTimeEnd').name('When should sleep mode end?');

        });


        page.section('Settings', section => {

        });


        page.section('Notifications', section => {
            section.enumSetting('sendPushMessage').name('Send a push notification?');

        });


    })
