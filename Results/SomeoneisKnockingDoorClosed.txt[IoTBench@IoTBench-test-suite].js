
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When someone knocks on this door...', section => {
            section.deviceSetting('acceleration').capability(['accelerationSensor']).name('Knocking Detected');
            section.deviceSetting('contact').capability(['contactSensor']).name('And the door is closed');

        });


        page.section('Turn on these lights', section => {
            section.deviceSetting('switches').capability(['switch']).name('Turn On (optional)');
            section.numberSetting('delayMinutes').name('And off after minutes?');

        });


        page.section('Send this message (optional, sends standard message if not specified)', section => {
            section.textSetting('messageText').name('Message Text');

        });


        page.section('Via a push notification and/or an SMS message', section => {
            section.enumSetting('pushAndPhone').name('Also send push');

        });


        page.section('Minimum time between messages (optional, defaults to every message', section => {

        });


    })
