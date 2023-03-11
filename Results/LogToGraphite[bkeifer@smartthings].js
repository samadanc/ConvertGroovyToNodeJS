
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Log devices...', section => {
            section.deviceSetting('temperatures').capability(['temperatureMeasurement']).name('Temperatures');
            section.deviceSetting('humidities').capability(['relativeHumidityMeasurement']).name('Humidities');
            section.deviceSetting('contacts').capability(['contactSensor']).name('Contacts');
            section.deviceSetting('illuminances').capability(['illuminanceMeasurement']).name('Illuminances');
            section.deviceSetting('motions').capability(['motionSensor']).name('Motions');
            section.deviceSetting('switches').capability(['switch']).name('Switches');
            section.deviceSetting('batteries').capability(['battery']).name('Batteries');
            section.deviceSetting('thermostats').capability(['thermostat']).name('Thermostat Setpoints');
            section.deviceSetting('energymeters').capability(['energyMeter']).name('Energy Meters');
            section.deviceSetting('powermeters').capability(['powerMeter']).name('Power Meters');

        });


        page.section('Graphite Server', section => {
            section.textSetting('graphite_host').name('Graphite Hostname/IP');
            section.numberSetting('graphite_port').name('Graphite Port');

        });


    })

    .updated(async (context, updateData) => {

    })
