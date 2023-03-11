
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Devices', section => {
            section.deviceSetting('sources').capability(['sensor']).name('Devices to monitor?');

        });


        page.section('Operation', section => {

        });


    })
