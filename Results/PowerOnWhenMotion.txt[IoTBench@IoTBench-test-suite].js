
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When Motion is Detected', section => {
            section.deviceSetting('motion').capability(['motionSensor']).name('Motion Here');

        });


        page.section('Turn ON a light...', section => {
            section.deviceSetting('mySwitch').capability(['switch']).name('Switch Turned On');

        });


        page.section('If no motion is detected for this many minutes, turn light(s) OFF (optional)', section => {

        });


    })
