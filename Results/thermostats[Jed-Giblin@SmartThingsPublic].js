
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Choose one or more, when...', section => {
            section.deviceSetting('smokeDevices').capability(['smokeDetector']).name('Smoke Detected');
            section.deviceSetting('carbonMonoxideDevices').capability(['carbonMonoxideDetector']).name('Carbon Monoxide Detected');

        });


        page.section('Turn off these thermostats', section => {
            section.deviceSetting('thermostatDevices').capability(['thermostat']).name('Thermostats');

        });


        page.section('Send this message (optional, sends standard status message if not specified)', section => {
            section.textSetting('messageText').name('Message Text');

        });


        page.section('Via a push notification and/or an SMS message', section => {
            section.enumSetting('pushAndPhone').name('Notify me via Push Notification');

        });


        page.section('Minimum time between messages (optional, defaults to every message)', section => {

        });


    })
