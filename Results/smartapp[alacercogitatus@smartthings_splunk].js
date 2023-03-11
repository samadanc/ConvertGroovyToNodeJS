
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Splunk HEC Settings', section => {
            section.textSetting('splunk_hec_url').name('Splunk HEC URI');

        });


        page.section('Wink Settings', section => {
            section.textSetting('wink_username').name('Wink Username');

        });


        page.section('Log these Devices:', section => {
            section.booleanSetting('consume_wink').name('Wink Hub');
            section.deviceSetting('presences').capability(['presenceSensor']).name('Presence');
            section.deviceSetting('switches').capability(['switch']).name('Switches');
            section.deviceSetting('levels').capability(['switchLevel']).name('Levels');
            section.deviceSetting('motions').capability(['motionSensor']).name('Motions');
            section.deviceSetting('temperatures').capability(['temperatureMeasurement']).name('Temperatures');
            section.deviceSetting('humidities').capability(['relativeHumidityMeasurement']).name('Humidities');
            section.deviceSetting('contacts').capability(['contactSensor']).name('Contacts');
            section.deviceSetting('alarms').capability(['alarm']).name('Alarms');
            section.deviceSetting('indicators').capability(['indicator']).name('Indicators');
            section.deviceSetting('codetectors').capability(['carbonMonoxideDetector']).name('CO Detectors');
            section.deviceSetting('smokedetectors').capability(['smokeDetector']).name('Smoke Detectors');
            section.deviceSetting('waterdetectors').capability(['waterSensor']).name('Water Sensors');
            section.deviceSetting('energymeters').capability(['energyMeter']).name('Energy Meters');
            section.deviceSetting('battery').capability(['battery']).name('Batteries');
            section.deviceSetting('contactsensor').capability(['contactSensor']).name('Contact Sensors');
            section.deviceSetting('acceleration').capability(['accelerationSensor']).name('Acceleration Sensors');

        });


    })

    .updated(async (context, updateData) => {

    })
