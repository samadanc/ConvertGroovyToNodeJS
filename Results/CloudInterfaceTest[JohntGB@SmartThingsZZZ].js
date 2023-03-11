
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Allow external control to these things...', section => {
            section.deviceSetting('switches').capability(['switch']).name('Which Switches?');
            section.deviceSetting('dimmers').capability(['switchLevel']).name('Which Dimmers?');
            section.deviceSetting('locks').capability(['lock']).name('Which Locks?');
            section.deviceSetting('thermostats').capability(['thermostat']).name('Which Thermostats?');
            section.deviceSetting('alarms').capability(['alarm']).name('Which Alarms?');
            section.deviceSetting('doorControls').capability(['doorControl']).name('Which Doors?');

        });


        page.section('Allow external visibility to these things...', section => {
            section.deviceSetting('presence').capability(['presenceSensor']).name('Which Presence?');
            section.deviceSetting('temperature').capability(['temperatureMeasurement']).name('Which Temperature?');
            section.deviceSetting('illuminance').capability(['illuminanceMeasurement']).name('Which Light Level?');
            section.deviceSetting('humidity').capability(['relativeHumidityMeasurement']).name('Which Hygrometer?');
            section.deviceSetting('motions').capability(['motionSensor']).name('Which Motion Sensors?');
            section.deviceSetting('contactSensors').capability(['contactSensor']).name('Which Contact Sensors?');
            section.deviceSetting('buttonDevices').capability(['button']).name('Which Buttons?');
            section.deviceSetting('waterSensors').capability(['waterSensor']).name('Which Water Sensors?');
            section.deviceSetting('carbonMonoxideDetectors').capability(['carbonMonoxideDetector']).name('Which Carbon Monoxide Detectors?');
            section.deviceSetting('smokeDetectors').capability(['smokeDetector']).name('Which Smoke Detectors?');

        });


    })
