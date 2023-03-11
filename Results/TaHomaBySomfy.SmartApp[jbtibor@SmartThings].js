
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {
            section.textSetting('username').name('Username');

        });


        page.section('General', section => {
            section.booleanSetting('debugMode').name('Enable debug logging');

        });


    })
