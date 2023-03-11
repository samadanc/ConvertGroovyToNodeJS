
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Expose these devices via the API', section => {
            section.deviceSetting('refreshList').capability(['refresh']).name('Most Devices');
            section.deviceSetting('sensorList').capability(['sensor']).name('Other Sensors');
            section.deviceSetting('actuatorList').capability(['actuator']).name('Other Actuators');

        });


    })
