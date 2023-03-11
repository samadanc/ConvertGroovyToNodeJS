
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Set this thermostat', section => {
            section.deviceSetting('thermostat').capability(['thermostat']).name('Which?');

        });


    })
