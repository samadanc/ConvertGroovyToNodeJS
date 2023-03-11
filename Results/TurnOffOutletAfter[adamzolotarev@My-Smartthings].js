
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Monitor these outlet(s)', section => {
            section.deviceSetting('outlet').capability(['switch']).name('Which?');

        });


        page.section('Turn off after', section => {
            section.numberSetting('minutes').name('Minutes');

        });


    })
