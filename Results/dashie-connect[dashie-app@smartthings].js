
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {
            section.deviceSetting('devices').capability(['actuator']).name('Devices');
            section.deviceSetting('sensors').capability(['sensor']).name('Sensors');
            section.deviceSetting('temperatures').capability(['temperatureMeasurement']).name('Temperatures');
            section.deviceSetting('presenceSensor').capability(['presenceSensor']).name('Presence');

        });


    })
