
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Choose one or more, when...', section => {
            section.deviceSetting('motion').capability(['motionSensor']).name('Motion Here');
            section.deviceSetting('contact').capability(['contactSensor']).name('Contact Opens');
            section.deviceSetting('acceleration').capability(['accelerationSensor']).name('Acceleration Detected');
            section.deviceSetting('mySwitch').capability(['switch']).name('Switch Turned On');
            section.deviceSetting('arrivalPresence').capability(['presenceSensor']).name('Arrival Of');
            section.deviceSetting('departurePresence').capability(['presenceSensor']).name('Departure Of');
            section.deviceSetting('lock').capability(['lock']).name('Unlock/Lock');

        });


        page.section('Message Text', section => {
            section.textSetting('messageText').name('Message Text');

        });


        page.section('Lock Notifications', section => {
            section.enumSetting('lockNotify').name('Notify on Lock?');
            section.enumSetting('unlockNotify').name('Notify on Unlock?');

        });


        page.section('Send SmartThings Notification (optional)', section => {
            section.enumSetting('pushNotification').name('Send SmartThings Notification?');

        });


        page.section('Send SMS Message to (optional)', section => {

        });


        page.section('Send Pushover Notification (optional)', section => {
            section.textSetting('apiKey').name('Pushover API Key');
            section.textSetting('userKey').name('Pushover User Key');
            section.textSetting('deviceName').name('Pushover Device Name');
            section.enumSetting('priority').name('Pushover Priority');
            section.enumSetting('sound').name('Pushover Alert Sound');

        });


    })
