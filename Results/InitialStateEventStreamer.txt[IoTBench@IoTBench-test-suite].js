
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Choose which devices to monitor...', section => {
            section.deviceSetting('alarms').capability(['alarm']).name('Alarms');
            section.deviceSetting('contacts').capability(['contactSensor']).name('Contact Sensors');
            section.deviceSetting('locks').capability(['lock']).name('Locks');
            section.deviceSetting('motions').capability(['motionSensor']).name('Motion Sensors');
            section.deviceSetting('presences').capability(['presenceSensor']).name('Presence Sensors');
            section.deviceSetting('humidities').capability(['relativeHumidityMeasurement']).name('Humidity Meters');
            section.deviceSetting('switches').capability(['switch']).name('Switches');
            section.deviceSetting('switchLevels').capability(['switchLevel']).name('Switch Levels');
            section.deviceSetting('temperatures').capability(['temperatureMeasurement']).name('Temperature Sensors');
            section.deviceSetting('thermostats').capability(['thermostat']).name('Thermostats');
            section.deviceSetting('waterSensors').capability(['waterSensor']).name('Water Sensors');

        });


    })
