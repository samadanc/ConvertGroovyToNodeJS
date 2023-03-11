
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Control these devices', section => {
            section.deviceSetting('switches').capability(['switch']).name('Select switches');
            section.deviceSetting('bubls').capability(['bulb']).name('Select bubls');
            section.deviceSetting('lights').capability(['light']).name('Select lights');
            section.deviceSetting('outlets').capability(['outlet']).name('Select outlets');
            section.deviceSetting('relaySwitches').capability(['relaySwitch']).name('Select relay switches');

        });


    })
