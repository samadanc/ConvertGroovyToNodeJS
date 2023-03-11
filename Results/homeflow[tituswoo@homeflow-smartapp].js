
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Control these devices...', section => {
            section.deviceSetting('Actuator').capability(['actuator']).name('Which actuators (duplicates OK)');
            section.deviceSetting('Sensor').capability(['sensor']).name('Which sensors (duplicates OK)');

        });


    })
