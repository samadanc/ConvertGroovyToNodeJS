
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Garage door actuator', section => {
            section.deviceSetting('actuatorSwitch').capability(['switch']).name('Garage Door Actuator Switch');

        });


        page.section('Garage door multisensor', section => {
            section.deviceSetting('contactSensor').capability(['contactSensor']).name('Garage Door Contact Sensor');
            section.deviceSetting('accelerationSensor').capability(['accelerationSensor']).name('Garage Door Acceleration Sensor');

        });


        page.section('Virtual garage door device', section => {
            section.deviceSetting('garage').capability(['doorControl']).name('Virtual Garage Door');

        });


    })
