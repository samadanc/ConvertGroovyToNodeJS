
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Allow Microsoft to control these things...', section => {
            section.deviceSetting('switches').capability(['switch']).name('Which Switches and Lights?');
            section.deviceSetting('thermostats').capability(['thermostat']).name('Which Thermostat?');

        });


    })
