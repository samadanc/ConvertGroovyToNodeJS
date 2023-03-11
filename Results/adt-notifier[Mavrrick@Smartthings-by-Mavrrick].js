
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Set Message for each state', section => {
            section.textSetting('messageDisarmed').name('Send this message if alarm changes to Disarmed');
            section.textSetting('messageArmedAway').name('Send this message if alarm changes to Armed/Away');
            section.textSetting('messageArmedStay').name('Send this message if alarm changes to Armed/Stay');

        });


        page.section('Via a push notification and/or an SMS message', section => {
            section.enumSetting('pushAndPhone').name('Notify me via Push Notification');

        });


        page.section('Minimum time between messages (optional, defaults to every message)', section => {

        });


    })
