
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Choose thermostat... ', section => {
            section.deviceSetting('thermostat').capability(['thermostat']).name('');

        });


        page.section('Heat setting...', section => {

        });


        page.section('Air conditioning setting...', section => {

        });


        page.section('Optionally choose temperature sensor to use instead of the thermostat\'s... ', section => {
            section.deviceSetting('sensor').capability(['temperatureMeasurement']).name('Temp Sensors');

        });


    })
