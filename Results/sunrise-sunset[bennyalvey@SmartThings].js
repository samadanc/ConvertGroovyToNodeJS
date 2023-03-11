
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('At sunrise...', section => {
            section.deviceSetting('sunriseOn').capability(['switch']).name('Turn on?');
            section.deviceSetting('sunriseOff').capability(['switch']).name('Turn off?');

        });


        page.section('At sunset...', section => {
            section.deviceSetting('sunsetOn').capability(['switch']).name('Turn on?');
            section.deviceSetting('sunsetOff').capability(['switch']).name('Turn off?');

        });


        page.section('Sunrise offset (optional)...', section => {
            section.textSetting('sunriseOffsetValue').name('HH:MM');
            section.enumSetting('sunriseOffsetDir').name('Before or After');

        });


        page.section('Sunset offset (optional)...', section => {
            section.textSetting('sunsetOffsetValue').name('HH:MM');
            section.enumSetting('sunsetOffsetDir').name('Before or After');

        });


        page.section('Zip code (optional, defaults to location coordinates)...', section => {
            section.textSetting('zipCode').name('');

        });


        page.section('Notifications', section => {
            section.enumSetting('sendPushMessage').name('Send a push notification?');

        });


    })
