
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When smoke is sensed...', section => {
            section.deviceSetting('smoke').capability(['smokeDetector']).name('Smoke Detected');

        });


        page.section('Turn off a switch...', section => {
            section.deviceSetting('light').capability(['switch']).name('Which?');

        });


    })
