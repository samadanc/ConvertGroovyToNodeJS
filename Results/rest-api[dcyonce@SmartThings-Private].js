
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Report via REST on these things...', section => {
            section.deviceSetting('switches').capability(['switch']).name('Lights');
            section.deviceSetting('probes').capability(['temperatureMeasurement']).name('Sensors');
            section.deviceSetting('weatherStations').capability(['waterSensor']).name('Weather Stations');
            section.deviceSetting('people').capability(['presenceSensor']).name('People');

        });


    })
