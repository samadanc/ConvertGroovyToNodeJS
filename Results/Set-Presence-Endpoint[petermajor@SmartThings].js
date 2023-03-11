
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Which presence sensor?', section => {
            section.deviceSetting('presence').capability(['presenceSensor']).name('presence');

        });


    })
