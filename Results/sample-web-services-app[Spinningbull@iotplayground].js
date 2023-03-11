
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Web Service Control over the house', section => {
            section.deviceSetting('switches').capability(['switch']).name('');

        });


    })
