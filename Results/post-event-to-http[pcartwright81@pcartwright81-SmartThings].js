
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Log these presence sensors:', section => {
            section.deviceSetting('presences').capability(['presenceSensor']).name('');

        });


        page.section('Log these switches:', section => {
            section.deviceSetting('switches').capability(['switch']).name('');

        });


        page.section('Log these switch levels:', section => {
            section.deviceSetting('levels').capability(['switchLevel']).name('');

        });


        page.section('Log these motion sensors:', section => {
            section.deviceSetting('motions').capability(['motionSensor']).name('');

        });


        page.section('Log these temperature sensors:', section => {
            section.deviceSetting('temperatures').capability(['temperatureMeasurement']).name('');

        });


        page.section('Log these humidity sensors:', section => {
            section.deviceSetting('humidities').capability(['relativeHumidityMeasurement']).name('');

        });


        page.section('Log these contact sensors:', section => {
            section.deviceSetting('contacts').capability(['contactSensor']).name('');

        });


        page.section('Log these alarms:', section => {
            section.deviceSetting('alarms').capability(['alarm']).name('');

        });


        page.section('Log these indicators:', section => {
            section.deviceSetting('indicators').capability(['indicator']).name('');

        });


        page.section('Log these CO detectors:', section => {
            section.deviceSetting('codetectors').capability(['carbonMonoxideDetector']).name('');

        });


        page.section('Log these smoke detectors:', section => {
            section.deviceSetting('smokedetectors').capability(['smokeDetector']).name('');

        });


        page.section('Log these water detectors:', section => {
            section.deviceSetting('waterdetectors').capability(['waterSensor']).name('');

        });


        page.section('Log these acceleration sensors:', section => {
            section.deviceSetting('accelerations').capability(['accelerationSensor']).name('');

        });


        page.section('Log these energy meters:', section => {
            section.deviceSetting('energymeters').capability(['energyMeter']).name('');

        });


        page.section('Log these power meters:', section => {
            section.deviceSetting('powermeters').capability(['powerMeter']).name('');

        });


        page.section('Log these thermostats:', section => {
            section.deviceSetting('thermostats').capability(['thermostat']).name('Thermostats');

        });


        page.section('Log these locks:', section => {
            section.deviceSetting('locks').capability(['lock']).name('Locks');

        });


        page.section('Server', section => {
            section.textSetting('httpserver_host').name('Hostname/IP');
            section.numberSetting('httpserver_port').name('Port');

        });


    })
