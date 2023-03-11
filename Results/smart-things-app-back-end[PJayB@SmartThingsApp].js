
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Allow unofficial SmartThings apps access to these Actuators:', section => {
            section.deviceSetting('actuators').capability(['actuator']).name('');

        });


        page.section('Allow unofficial SmartThings apps access to these Sensors:', section => {
            section.deviceSetting('sensors').capability(['sensor']).name('');

        });


    })
