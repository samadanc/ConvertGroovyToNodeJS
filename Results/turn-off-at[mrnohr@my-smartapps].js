
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('At a specific time..', section => {
            section.timeSetting('time1').name('When?');

        });


        page.section('Turn off some lights..', section => {
            section.deviceSetting('switches1').capability(['switch']).name('');

        });


    })
