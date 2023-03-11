
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Switch Function: ON = Arm', section => {
            section.deviceSetting('switch1').capability(['switch']).name('');
            section.textSetting('userName').name('Username');

        });


    })
