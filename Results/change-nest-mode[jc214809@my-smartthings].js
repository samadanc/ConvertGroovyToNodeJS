
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Change to this mode to...', section => {

        });


        page.section('Change these thermostats modes...', section => {
            section.deviceSetting('thermostats').capability(['thermostat']).name('');

        });


    })

    .updated(async (context, updateData) => {

    })
