
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('which presence sensors?', section => {
            section.deviceSetting('theSensors').capability(['presenceSensor']).name('');

        });


    })
