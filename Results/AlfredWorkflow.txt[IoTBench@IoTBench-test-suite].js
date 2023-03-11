
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Allow Alfred to Control These Things...', section => {
            section.deviceSetting('switches').capability(['switch']).name('Which Switches?');
            section.deviceSetting('locks').capability(['lock']).name('Which Locks?');

        });


    })
