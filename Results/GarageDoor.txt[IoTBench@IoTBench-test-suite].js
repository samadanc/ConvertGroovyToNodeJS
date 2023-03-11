
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Choose one or more, when...', section => {
            section.deviceSetting('Switch1').capability(['switch']).name('Switch Turned On');

        });


    })
