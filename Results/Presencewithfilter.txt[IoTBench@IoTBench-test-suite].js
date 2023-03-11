
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select a presence sensor', section => {
            section.deviceSetting('presenceSensor').capability(['presenceSensor']).name('Presence sensor');

        });


        page.section('Subscribe to the desired status change(s) (default is Both)', section => {
            section.enumSetting('statusSubscription').name('Status changes');

        });


        page.section('Enter notification messages (leave blank to push default status messages)', section => {
            section.textSetting('arrivalText').name('Arrival message');
            section.textSetting('departureText').name('Departure message');

        });


        page.section('Send a push notification? (default is Yes)', section => {
            section.enumSetting('sendPushPreference').name('Push (optional)');

        });


        page.section('Enter a phone number to send an SMS notification', section => {

        });


        page.section('Filter sensor dropouts by entering an allowed disconnect time (will delay departure notifications by same time)', section => {

        });


    })
