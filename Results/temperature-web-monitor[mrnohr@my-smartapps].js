
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Pick the temperature monitors', section => {
            section.deviceSetting('monitors1').capability(['temperatureMeasurement']).name('Upstairs');
            section.deviceSetting('monitors2').capability(['temperatureMeasurement']).name('Main Floor');
            section.deviceSetting('monitors3').capability(['temperatureMeasurement']).name('Basement');

        });


    })
