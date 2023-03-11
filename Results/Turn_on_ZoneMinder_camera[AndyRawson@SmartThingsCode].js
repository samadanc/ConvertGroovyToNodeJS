
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Choose one or more, when...', section => {
            section.deviceSetting('motion').capability(['motionSensor']).name('Motion Here');
            section.deviceSetting('contact').capability(['contactSensor']).name('Contact Opens');

        });


        page.section('And the current mode is...', section => {

        });


        page.section('Turn this on...', section => {
            section.deviceSetting('switch1').capability(['switch']).name('Switch?');

        });


        page.section('And Notify...', section => {
            section.enumSetting('sendPushMessage').name('Send a push notification?');

        });


        page.section('Computer\'s local IP address...', section => {
            section.numberSetting('ipaddress').name('IP Address');

        });


        page.section('Which camera to record...', section => {
            section.numberSetting('monitorid').name('Montior ID');

        });


        page.section('How long to record...', section => {
            section.numberSetting('recordtime').name('How many Seconds?');

        });


    })
