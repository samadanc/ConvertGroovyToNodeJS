
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Allow External Service to Control These Things...', section => {
            section.deviceSetting('switches').capability(['switch']).name('Which Switches?');
            section.deviceSetting('motions').capability(['motionSensor']).name('Which Motion Sensors?');
            section.deviceSetting('locks').capability(['lock']).name('Which Locks?');

        });


    })
