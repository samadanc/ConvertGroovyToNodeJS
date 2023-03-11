
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

        });


        page.section('Then send this message in a push notification', section => {
            section.textSetting('messageText').name('Message Text');

        });


        page.section('And as text message to this number (optional)', section => {

        });


    })
