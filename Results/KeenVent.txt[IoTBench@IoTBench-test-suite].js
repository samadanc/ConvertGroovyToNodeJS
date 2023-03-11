
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Allow Endpoint to Control These Things...', section => {
            section.deviceSetting('switches').capability(['switch']).name('Which Switches?');

        });


        page.section('Optionally choose temperature sensor to use instead of the thermostat\'s... ', section => {
            section.deviceSetting('sensor').capability(['temperatureMeasurement']).name('Temp Sensors');

        });


    })
