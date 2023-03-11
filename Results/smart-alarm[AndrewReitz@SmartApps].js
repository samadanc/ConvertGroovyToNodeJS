
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select switches to control...', section => {
            section.deviceSetting('switches').capability(['switch']).name('');

        });


        page.section('Turn them all on at...', section => {
            section.timeSetting('startTime').name('Turn On Time?');

        });


    })
