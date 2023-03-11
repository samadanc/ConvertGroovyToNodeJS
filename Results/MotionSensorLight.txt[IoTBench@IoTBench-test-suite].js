
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Motion Sensors (Required)', section => {
            section.deviceSetting('motionSensors').capability(['motionSensor']).name('Add sensors');

        });


        page.section('Power Outlets (Required)', section => {
            section.deviceSetting('outlets').capability(['switch']).name('Add outlets');

        });


        page.section('Minimum Duration', section => {
            section.numberSetting('minutes').name('Minutes');

        });


    })
