
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Allow endpoint to control this simulated motion sensor...', section => {
            section.deviceSetting('motions').capability(['motionSensor']).name('Which simulated motion sensor?');

        });


    })
