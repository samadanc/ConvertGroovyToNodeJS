
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Home Assistant', section => {
            section.textSetting('ha_url').name('HA Domain Name');
            section.numberSetting('ha_port').name('HA Port');

        });


        page.section('['name': 'Devices To Bridge', 'hideWhenEmpty': true]', section => {
            section.deviceSetting('acceleration_sensors').capability(['accelerationSensor']).name('Acceleration Sensors');
            section.deviceSetting('air_quality_sensors').capability(['airQualitySensor']).name('Air Quality Sensors');
            section.deviceSetting('carbon_dioxide_sensors').capability(['carbonDioxideMeasurement']).name('Carbon Dioxide Sensors');
            section.deviceSetting('contact_sensors').capability(['contactSensor']).name('Contact Sensors');
            section.deviceSetting('dust_sensors').capability(['dustSensor']).name('Dust Sensors');
            section.deviceSetting('illuminance_sensors').capability(['illuminanceMeasurement']).name('Illuminance Sensors');
            section.deviceSetting('motion_sensors').capability(['motionSensor']).name('Motion Sensors');
            section.deviceSetting('odor_sensors').capability(['odorSensor']).name('Odor Sensors');
            section.deviceSetting('presence_sensors').capability(['presenceSensor']).name('Presence Sensors');
            section.deviceSetting('sleep_sensors').capability(['sleepSensor']).name('Sleep Sensors');
            section.deviceSetting('smoke_sensors').capability(['smokeDetector']).name('Smoke Sensors');
            section.deviceSetting('sound_sensors').capability(['soundSensor']).name('Sound Sensors');
            section.deviceSetting('step_sensors').capability(['stepSensor']).name('Step Sensors');
            section.deviceSetting('temperature_sensors').capability(['temperatureMeasurement']).name('Temperature Sensors');
            section.deviceSetting('touch_sensors').capability(['touchSensor']).name('Touch Sensors');
            section.deviceSetting('water_sensors').capability(['waterSensor']).name('Water Sensors');

        });


    })
