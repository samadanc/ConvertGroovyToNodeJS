
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Allow Endpoint to Control This Thing', section => {
            section.deviceSetting('tdevice').capability(['temperatureMeasurement']).name('Which Simulated Temperature Sensor?');

        });


    })
