
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Turn off these thermostats', section => {
            section.deviceSetting('thermostats').capability(['thermostat']).name('');
            section.booleanSetting('notify').name('Notify?');

        });


    })

    .updated(async (context, updateData) => {

    })
