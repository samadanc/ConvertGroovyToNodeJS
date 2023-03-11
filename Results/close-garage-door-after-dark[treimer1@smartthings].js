
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Warn if garage door is open...', section => {
            section.deviceSetting('door').capability(['doorControl']).name('Which garage door controller?');

        });


        page.section('Sunset offset (optional)...', section => {
            section.textSetting('sunsetOffsetValue').name('HH:MM');
            section.enumSetting('sunsetOffsetDir').name('Before or After');

        });


        page.section('Zip code (optional, defaults to location coordinates)...', section => {
            section.textSetting('zipCode').name('Zip Code');

        });


        page.section('Automatically Close', section => {
            section.enumSetting('autoClose').name('Automatically Close if left open?');

        });


        page.section('Notifications', section => {
            section.enumSetting('sendPushMessage').name('Send a push notification?');
            section.textSetting('message').name('Message to send...');

        });


    })
