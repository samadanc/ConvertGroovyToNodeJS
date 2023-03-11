
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Log these CO Detectors:', section => {
            section.deviceSetting('codetectors').capability(['carbonMonoxideDetector']).name('');

        });


        page.section('Log these Acceleration Sensors:', section => {
            section.deviceSetting('accelerations').capability(['accelerationSensor']).name('');

        });


        page.section('Log these Alarms:', section => {
            section.deviceSetting('alarms').capability(['alarm']).name('');

        });


        page.section('Log these Batteries:', section => {
            section.deviceSetting('batteries').capability(['battery']).name('');

        });


        page.section('Log these Buttons:', section => {
            section.deviceSetting('button').capability(['button']).name('');

        });


        page.section('Log these Contact Sensors:', section => {
            section.deviceSetting('contacts').capability(['contactSensor']).name('');

        });


        page.section('Log these Doors Controllers:', section => {
            section.deviceSetting('doorcontrollers').capability(['doorControl']).name('');

        });


        page.section('Log these Energy Meters:', section => {
            section.deviceSetting('energymeters').capability(['energyMeter']).name('');

        });


        page.section('Log these Humidity Sensors:', section => {
            section.deviceSetting('humidities').capability(['relativeHumidityMeasurement']).name('');

        });


        page.section('Log these Illuminance Sensors:', section => {
            section.deviceSetting('illuminances').capability(['illuminanceMeasurement']).name('');

        });


        page.section('Log these Indicators:', section => {
            section.deviceSetting('indicators').capability(['indicator']).name('');

        });


        page.section('Log these Locks:', section => {
            section.deviceSetting('lockDevice').capability(['lock']).name('');

        });


        page.section('Log these Motion Sensors:', section => {
            section.deviceSetting('motions').capability(['motionSensor']).name('');

        });


        page.section('Log these Music Players:', section => {
            section.deviceSetting('musicplayer').capability(['musicPlayer']).name('');

        });


        page.section('Log these Power Meters:', section => {
            section.deviceSetting('powermeters').capability(['powerMeter']).name('');

        });


        page.section('Log these Presence Sensors:', section => {
            section.deviceSetting('presences').capability(['presenceSensor']).name('');

        });


        page.section('Log these Smoke Detectors:', section => {
            section.deviceSetting('smokedetectors').capability(['smokeDetector']).name('');

        });


        page.section('Log these Switch Levels:', section => {
            section.deviceSetting('levels').capability(['switchLevel']).name('');

        });


        page.section('Log these Switches:', section => {
            section.deviceSetting('switches').capability(['switch']).name('');

        });


        page.section('Log these Tamper Alerts:', section => {
            section.deviceSetting('tamperAlert').capability(['tamperAlert']).name('');

        });


        page.section('Log these Temperature Sensors:', section => {
            section.deviceSetting('temperatures').capability(['temperatureMeasurement']).name('');

        });


        page.section('Log these Three-axis (Orientation) Sensors:', section => {
            section.deviceSetting('threeAxis').capability(['threeAxis']).name('');

        });


        page.section('Log these Thermostats:', section => {
            section.deviceSetting('thermostats').capability(['thermostat']).name('');

        });


        page.section('Log these Voltages:', section => {
            section.deviceSetting('voltage').capability(['voltageMeasurement']).name('');

        });


        page.section('Log these Water Detectors:', section => {
            section.deviceSetting('waterdetectors').capability(['waterSensor']).name('');

        });


        page.section('Loki Server', section => {
            section.textSetting('loki_host').name('Loki Hostname/IP');
            section.numberSetting('loki_port').name('Loki Port');
            section.textSetting('loki_user').name('Loki User');
            section.textSetting('loki_api_key').name('Loki API Key');
            section.textSetting('loki_path').name('Loki Path');

        });


    })
