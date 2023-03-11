
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Settings', section => {
            section.deviceSetting('switches').capability(['switch']).name('Switches');
            section.deviceSetting('temperatures').capability(['temperatureMeasurement']).name('Temperature');

        });


    })
