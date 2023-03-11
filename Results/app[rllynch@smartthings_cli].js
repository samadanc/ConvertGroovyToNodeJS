
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Allow CLI Access to These Things...', section => {
            section.deviceSetting('switches').capability(['switch']).name('Switch');
            section.deviceSetting('motions').capability(['motionSensor']).name('Motion');
            section.deviceSetting('temperatures').capability(['temperatureMeasurement']).name('Temperature');
            section.deviceSetting('humidities').capability(['relativeHumidityMeasurement']).name('Humidity');
            section.deviceSetting('contacts').capability(['contactSensor']).name('Contact');
            section.deviceSetting('accelerations').capability(['accelerationSensor']).name('Acceleration');
            section.deviceSetting('presences').capability(['presenceSensor']).name('Presence');
            section.deviceSetting('batteries').capability(['battery']).name('Battery');
            section.deviceSetting('threeaxes').capability(['threeAxis']).name('3 Axis');

        });


    })
