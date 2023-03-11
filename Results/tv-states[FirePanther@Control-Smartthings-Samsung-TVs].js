
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('suat wants to control your tvs', section => {
            section.deviceSetting('tvs').capability(['switch']).name('Which TVs?');

        });


    })
