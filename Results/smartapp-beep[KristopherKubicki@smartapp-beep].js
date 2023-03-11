
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Sirens', section => {
            section.deviceSetting('sirens').capability(['alarm']).name('Which?');

        });


        page.section('Virtual Switch', section => {
            section.deviceSetting('dswitch').capability(['momentary']).name('Which?');

        });


    })
