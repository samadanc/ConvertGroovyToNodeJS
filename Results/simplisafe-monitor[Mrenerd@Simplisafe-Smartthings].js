
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Monitor and control this SimpliSafe alarm system', section => {
            section.deviceSetting('alarmsystem').capability(['alarm']).name('Select alarm system');

        });


        page.section('Control these switchs', section => {
            section.deviceSetting('alarmtile').capability(['switch']).name('Select switches');

        });


        page.section('Turn on switchs when SimpliSafe state matches', section => {
            section.enumSetting('alarmon').name('Select on state');

        });


        page.section('Turn off switchs when SimpliSafe state matches', section => {
            section.enumSetting('alarmoff').name('Select off state');

        });


        page.section('Notifications', section => {
            section.enumSetting('sendPushMessage').name('Send a push notification?');

        });


    })
