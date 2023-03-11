
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {
            section.deviceSetting('thermostat').capability(['thermostat']).name('Which Thermostat?');
            section.deviceSetting('tempsen').capability(['temperatureMeasurement']).name('Use Which Temperature Sensor');

        });


        page.section('['hidden': true], 'Fan Control', section => {
            section.numberSetting('fanon').name('How long to has the fan on?');
            section.numberSetting('fanoff').name('How long to has the fan off?');

        });


        page.section('['hidden': true], 'Comfort Settings', section => {

        });


        page.section('['hidden': true], 'Semi-Comfort Settings', section => {

        });


        page.section('['hidden': true], 'Night Settings', section => {

        });


    })
