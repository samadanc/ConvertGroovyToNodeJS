
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Allow Endpoint to Control These Things...', section => {
            section.deviceSetting('switches').capability(['switch']).name('Which Switches?');
            section.deviceSetting('locks').capability(['lock']).name('Which Locks?');
            section.deviceSetting('thermostats').capability(['thermostat']).name('Which Thermostat?');
            section.deviceSetting('temprature').capability(['temperatureMeasurement']).name('Which Temp Devices?');
            section.deviceSetting('presence').capability(['presenceSensor']).name('Which presence Devices?');
            section.deviceSetting('alarm').capability(['alarm']).name('Which alarm Devices?');
            section.deviceSetting('water').capability(['waterSensor']).name('Which moisture Devices?');
            section.deviceSetting('motion').capability(['motionSensor']).name('Which motion Devices?');

        });


    })
