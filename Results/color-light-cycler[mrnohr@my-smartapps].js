
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Control these bulbs', section => {
            section.deviceSetting('bulbs').capability(['colorControl']).name('Which Bulbs?');

        });


        page.section('With these colors', section => {
            section.enumSetting('colors').name('Which Colors?');

        });


        page.section('On this schedule', section => {
            section.numberSetting('seconds').name('How long between color changes (seconds)?');

        });


    })
