
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Choose one or more, when...', section => {
            section.deviceSetting('mySwitch').capability(['switch']).name('Switch Turned On');
            section.numberSetting('dimmingLevel').name('Minimum Dimming Level, from 0-100 (only for dimmers)');

        });


        page.section('Choose camera to use', section => {
            section.deviceSetting('camera').capability(['imageCapture']).name('');

        });


    })
