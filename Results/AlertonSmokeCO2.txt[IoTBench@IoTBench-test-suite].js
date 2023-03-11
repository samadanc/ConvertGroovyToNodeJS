
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select smoke detector(s)...', section => {
            section.deviceSetting('smoke_detectors').capability(['smokeDetector']).name('Which one(s)...?');

        });


        page.section('Notifications', section => {
            section.enumSetting('sendPushMessage').name('Send a push notification?');

        });


        page.section('Low battery warning', section => {
            section.numberSetting('lowBattThreshold').name('Low Batt Threshold % (default 10%)');

        });


    })
