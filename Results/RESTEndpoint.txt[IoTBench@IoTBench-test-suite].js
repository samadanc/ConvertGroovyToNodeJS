
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Allow endpoint to control these things...', section => {
            section.deviceSetting('switches').capability(['switch']).name('Which switches?');

        });


    })
