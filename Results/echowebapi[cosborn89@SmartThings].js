
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Allow a web application to control these things...', section => {
            section.deviceSetting('d_switch').capability(['switch']).name('Switch');

        });


    })
