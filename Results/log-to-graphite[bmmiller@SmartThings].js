
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
            section.deviceSetting('energymeters').capability(['powerMeter']).name('Power Meters');

        });


        page.section('Graphite (Backstop) Server', section => {
            section.textSetting('backstop_host').name('Backstop Hostname/IP');
            section.numberSetting('backstop_port').name('Backstop Port');

        });


    })

    .updated(async (context, updateData) => {

    })
