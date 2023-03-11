
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Inside open/close sensor', section => {
            section.deviceSetting('insideDoorState').capability(['contactSensor']).name('Inside Door?');

        });


        page.section('Outside open/close sensor', section => {
            section.deviceSetting('outsideDoorState').capability(['contactSensor']).name('Outside Door?');

        });


        page.section('Set this switch if leave detected', section => {
            section.deviceSetting('leaveOutputSwitch').capability(['switch']).name('');

        });


        page.section('Set this switch if enter detected', section => {
            section.deviceSetting('enterOutputSwitch').capability(['switch']).name('');

        });


        page.section('Set this switch for entering in progress', section => {
            section.deviceSetting('transitionIsEntering').capability(['switch']).name('');

        });


        page.section('Set this switch for leaving in progress', section => {
            section.deviceSetting('transitionIsLeaving').capability(['switch']).name('');

        });


    })
