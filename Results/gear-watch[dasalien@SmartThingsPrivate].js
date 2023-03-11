
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Choose devices to control with watch', section => {
            section.deviceSetting('switches').capability(['switch']).name('Which Switches?');
            section.deviceSetting('locks').capability(['lock']).name('Which Locks?');
            section.deviceSetting('lights').capability(['light']).name('Which Lights?');
            section.deviceSetting('levels').capability(['switchLevel']).name('Which level switches?');
            section.deviceSetting('motion').capability(['motionSensor']).name('Which Motion Sensors?');

        });


    })
