
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {
            section.textSetting('ipAddress').name('IP Address:');
            section.enumSetting('HTDtype').name('HTD Controller:');

        });


    })
