
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {
            section.deviceSetting('IncreaseFan').capability(['switch']).name('increase fan');
            section.deviceSetting('DecreaseFan').capability(['switch']).name('decrease fan');

        });


    })
