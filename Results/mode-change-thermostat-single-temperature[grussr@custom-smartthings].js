
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Choose thermostat (s)', section => {
            section.deviceSetting('thermostats').capability(['thermostat']).name('');

        });


        page.section('Set mode temperatures', section => {

        });


    })
