
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('LIFX API Connect', section => {
            section.textSetting('bearer').name('Bearer Token');

        });


    })
