
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Allow these things to be exposed via JSON...', section => {
            section.deviceSetting('switches').capability(['switch']).name('Switches');
            section.deviceSetting('temperatures').capability(['temperatureMeasurement']).name('Temp Measurements');
            section.deviceSetting('contacts').capability(['contactSensor']).name('Open/Closed Devices');
            section.deviceSetting('presences').capability(['presenceSensor']).name('Presence Sensors');
            section.deviceSetting('motions').capability(['motionSensor']).name('Motion Sensors');

        });


    })
