
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Allow external visibility to these things...', section => {
            section.deviceSetting('temperature').capability(['temperatureMeasurement']).name('Which Temperature?');

        });


    })
