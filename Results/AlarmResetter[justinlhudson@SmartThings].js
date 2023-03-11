
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Alarming...', section => {
            section.deviceSetting('alarms').capability(['alarm']).name('Reset alarms');
            section.deviceSetting('switches_reset').capability(['switch']).name('Reset switches');
            section.deviceSetting('switches_off').capability(['switch']).name('Off switches');
            section.numberSetting('reset').name('Reset (seconds)');

        });


    })
