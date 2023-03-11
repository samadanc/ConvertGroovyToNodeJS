
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When Someone Approaches Door?', section => {
            section.deviceSetting('motionSensor').capability(['motionSensor']).name('Where?');

        });


        page.section('Door to monitor?', section => {
            section.deviceSetting('openSensor').capability(['contactSensor']).name('Where?');

        });


        page.section('Motion Delay (defaults to 5s)?', section => {
            section.numberSetting('motionDelay').name('How Long?');

        });


        page.section('Door Open Exit Delay (defaults to 30s)?', section => {
            section.numberSetting('exitDelay').name('Delay on exiting door?');

        });


        page.section('Notifications', section => {
            section.enumSetting('sendPushMessage').name('Send a push notification?');

        });


    })
