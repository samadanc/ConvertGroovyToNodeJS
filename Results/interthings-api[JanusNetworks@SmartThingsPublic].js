
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Allow interthings to control these things...', section => {
            section.deviceSetting('switches').capability(['switch']).name('Which Switches?');
            section.deviceSetting('motionSensors').capability(['motionSensor']).name('Which Motion Sensors?');
            section.deviceSetting('contactSensors').capability(['contactSensor']).name('Which Contact Sensors?');
            section.deviceSetting('presenceSensors').capability(['presenceSensor']).name('Which Presence Sensors?');
            section.deviceSetting('temperatureSensors').capability(['temperatureMeasurement']).name('Which Temperature Sensors?');
            section.deviceSetting('accelerationSensors').capability(['accelerationSensor']).name('Which Vibration Sensors?');
            section.deviceSetting('waterSensors').capability(['waterSensor']).name('Which Water Sensors?');
            section.deviceSetting('lightSensors').capability(['illuminanceMeasurement']).name('Which Light Sensors?');
            section.deviceSetting('humiditySensors').capability(['relativeHumidityMeasurement']).name('Which Relative Humidity Sensors?');
            section.deviceSetting('alarms').capability(['alarm']).name('Which Sirens?');
            section.deviceSetting('locks').capability(['lock']).name('Which Locks?');
            section.deviceSetting('battery').capability(['battery']).name('Which Batteries?');

        });


    })
