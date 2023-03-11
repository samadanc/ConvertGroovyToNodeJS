
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Things to secure?', section => {
            section.deviceSetting('contacts').capability(['contactSensor']).name('Contact Sensors');
            section.deviceSetting('motions').capability(['motionSensor']).name('Motion Sensors');

        });


        page.section('Alarms to go off?', section => {
            section.deviceSetting('alarms').capability(['alarm']).name('Which Alarms?');
            section.deviceSetting('lights').capability(['switch']).name('Turn on which lights?');

        });


        page.section('Delay for presence lag?', section => {
            section.numberSetting('presenceDelay').name('Seconds (defaults to 15s)');

        });


        page.section('Notifications?', section => {
            section.enumSetting('sendPushMessage').name('Send a push notification?');

        });


        page.section('Message interval?', section => {
            section.numberSetting('messageDelay').name('Minutes (default to every message)');

        });


    })
