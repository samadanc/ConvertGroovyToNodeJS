
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('SmartThings Hub', section => {

        });


        page.section('SmartThings Node Proxy', section => {
            section.textSetting('proxyAddress').name('Proxy Address');
            section.textSetting('proxyPort').name('Proxy Port');

        });


    })
