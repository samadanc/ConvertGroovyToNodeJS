
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {
            section.textSetting('appId').name('App ID:');
            section.textSetting('bearer').name('API token:');

        });


    })
