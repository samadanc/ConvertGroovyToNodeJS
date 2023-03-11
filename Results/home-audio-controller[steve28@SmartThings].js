
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('SmartThings Hub', section => {

        });


        page.section('MCA-66 Controller', section => {
            section.textSetting('ip_address').name('Controller Address');
            section.textSetting('port').name('Controller Port');

        });


    })
