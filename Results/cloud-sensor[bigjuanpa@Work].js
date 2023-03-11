
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select devices to monitor', section => {
            section.deviceSetting('contactSensors').capability(['contactSensor']).name('Contact sensors');
            section.deviceSetting('motionSensors').capability(['motionSensor']).name('Motion sensors');
            section.deviceSetting('smokeDetectors').capability(['smokeDetector']).name('Smoke detectors');
            section.deviceSetting('alarms').capability(['alarm']).name('Alarms');

        });


    })
