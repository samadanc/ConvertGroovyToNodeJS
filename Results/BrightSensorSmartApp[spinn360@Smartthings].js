
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Brightswitch setup', section => {
            section.textSetting('bsIpAdress').name('Ip Address');
            section.textSetting('bsAuthToken').name('Auth Token');

        });


    })
