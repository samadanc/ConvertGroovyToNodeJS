
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When it opens...', section => {
            section.deviceSetting('contact1').capability(['contactSensor']).name('');

        });


        page.section('Turn on a switch...', section => {
            section.deviceSetting('switch1').capability(['switch']).name('');

        });


    })
