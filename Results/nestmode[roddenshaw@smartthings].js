
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Change this thermostat\'s mode...', section => {
            section.deviceSetting('thermostat').capability(['thermostat']).name('');

        });


    })

    .updated(async (context, updateData) => {

    })
