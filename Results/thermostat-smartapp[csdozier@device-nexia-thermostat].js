
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Allow App to Control This Nexia Thermostat...', section => {
            section.deviceSetting('sensor').capability(['sensor']).name('Which Thermostat?');

        });


    })
