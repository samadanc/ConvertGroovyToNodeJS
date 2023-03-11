
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Choose thermostat (s)', section => {
            section.deviceSetting('thermostatgroup1').capability(['thermostat']).name('Thermostats in group 1');
            section.deviceSetting('thermostatgroup2').capability(['thermostat']).name('Thermostats in group 2');
            section.deviceSetting('thermostatgroup3').capability(['thermostat']).name('Thermostats in group 3');
            section.deviceSetting('thermostatgroup4').capability(['thermostat']).name('Thermostats in group 4');

        });


        page.section('Set mode temperatures', section => {

        });


    })
