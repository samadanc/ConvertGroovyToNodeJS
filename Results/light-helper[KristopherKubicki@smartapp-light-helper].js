
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Tie these bulbs...', section => {
            section.deviceSetting('bulbs').capability(['switch']).name('Which bulbs');

        });


        page.section('To this switch', section => {
            section.deviceSetting('switches').capability(['switch']).name('Which switch?');

        });


    })
