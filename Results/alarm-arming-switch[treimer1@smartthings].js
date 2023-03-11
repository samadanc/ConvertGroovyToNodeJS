
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When this switch is turned on or off...', section => {
            section.deviceSetting('theSwitch').capability(['switch']).name('Which Switch?');

        });


        page.section('Arm this alarm...', section => {
            section.deviceSetting('alarmPanel').capability(['alarm']).name('');

        });


        page.section('Select Away or Stay', section => {
            section.enumSetting('armMode').name('Arm Mode');

        });


    })
