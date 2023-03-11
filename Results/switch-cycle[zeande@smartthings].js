
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Trigger this switch...', section => {
            section.deviceSetting('switch1').capability(['switch']).name('Which switch?');

        });


        page.section('Cycle duration...', section => {
            section.numberSetting('period').name('Period in minutes?');

        });


    })
