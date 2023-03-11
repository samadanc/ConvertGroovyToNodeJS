
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Allow external service to control these things...', section => {
            section.deviceSetting('switches').capability(['switch']).name('');

        });


        page.section('Control these motion sensors...', section => {
            section.deviceSetting('motions').capability(['motionSensor']).name('');

        });


        page.section('Control these temperature sensors...', section => {
            section.deviceSetting('temps').capability(['thermostat']).name('');

        });


    })
