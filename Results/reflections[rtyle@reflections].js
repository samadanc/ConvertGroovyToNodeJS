
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Title', section => {
            section.deviceSetting('primary').capability(['switch']).name('Primary');
            section.deviceSetting('secondary').capability(['switch']).name('Secondary');

        });


    })
