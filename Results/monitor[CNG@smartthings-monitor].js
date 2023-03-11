
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Sensor access', section => {
            section.deviceSetting('sensorsTemperature').capability(['temperatureMeasurement']).name('Temperature');
            section.deviceSetting('sensorsHumidity').capability(['relativeHumidityMeasurement']).name('Humidity');
            section.deviceSetting('sensorsEnergy').capability(['energyMeter']).name('Energy');
            section.deviceSetting('sensorsPower').capability(['powerMeter']).name('Power');
            section.deviceSetting('sensorsIlluminance').capability(['illuminanceMeasurement']).name('Illuminance');
            section.deviceSetting('sensorsMotion').capability(['motionSensor']).name('Motion');

        });


        page.section('Thermostat access', section => {
            section.deviceSetting('thermostats').capability(['thermostat']).name('Thermostat');

        });


        page.section('Switch access', section => {
            section.deviceSetting('switches').capability(['switch']).name('Switch');
            section.deviceSetting('switchesLevel').capability(['switchLevel']).name('Switch level');

        });


    })
