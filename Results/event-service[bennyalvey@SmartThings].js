
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Allow access to these devices...', section => {
            section.deviceSetting('switches').capability(['switch']).name('Which Switches?');
            section.deviceSetting('motionSensors').capability(['motionSensor']).name('Which Motion Sensors?');
            section.deviceSetting('contactSensors').capability(['contactSensor']).name('Which Contact Sensors?');
            section.deviceSetting('presenceSensors').capability(['presenceSensor']).name('Which Presence Sensors?');
            section.deviceSetting('temperatureSensors').capability(['temperatureMeasurement']).name('Which Temperature Sensors?');

        });


    })
