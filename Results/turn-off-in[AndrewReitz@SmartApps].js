
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select switches to turn off...', section => {
            section.deviceSetting('switches').capability(['switch']).name('');

        });


        page.section('Turn them off at...', section => {
            section.numberSetting('offTimeHr').name('Turn Off In (hrs)...');
            section.numberSetting('offTimeMin').name('Turn Off In (mins)...');

        });


        page.section('Send a notification?', section => {
            section.enumSetting('sendPushMessage').name('Send a push notification?');

        });


    })
