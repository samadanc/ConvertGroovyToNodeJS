
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Monitor one or more...', section => {
            section.deviceSetting('motion').capability(['motionSensor']).name('Motion');
            section.deviceSetting('contact').capability(['contactSensor']).name('Contact');
            section.deviceSetting('acceleration').capability(['accelerationSensor']).name('Acceleration');
            section.deviceSetting('mySwitch').capability(['switch']).name('Switch');
            section.deviceSetting('presence').capability(['presenceSensor']).name('Presence');
            section.deviceSetting('smoke').capability(['smokeDetector']).name('Smoke');
            section.deviceSetting('water').capability(['waterSensor']).name('Water');
            section.deviceSetting('temperature').capability(['temperatureMeasurement']).name('Temperature');
            section.deviceSetting('hygro').capability(['relativeHumidityMeasurement']).name('Hygrometer');
            section.deviceSetting('luminance').capability(['illuminanceMeasurement']).name('Luminance');
            section.deviceSetting('alarm').capability(['alarm']).name('Alarm');
            section.deviceSetting('lock').capability(['lock']).name('Lock');
            section.deviceSetting('music').capability(['musicPlayer']).name('Music');
            section.deviceSetting('location').capability(['locationMode']).name('Location Mode');
            section.deviceSetting('battery').capability(['battery']).name('Battery');
            section.deviceSetting('switchLevel').capability(['switchLevel']).name('Dimmer');
            section.deviceSetting('powerMeter').capability(['powerMeter']).name('Power');
            section.deviceSetting('energyMeter').capability(['energyMeter']).name('Energy');
            section.deviceSetting('thermostat').capability(['thermostat']).name('Thermostat');

        });


        page.section('Send to...', section => {
            section.textSetting('host').name('Host');
            section.numberSetting('port').name('Port');

        });


    })
