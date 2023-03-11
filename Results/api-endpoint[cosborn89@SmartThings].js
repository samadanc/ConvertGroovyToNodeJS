
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Allow Endpoint to Control These Things...', section => {
            section.deviceSetting('switches').capability(['switch']).name('Which Switches?');
            section.deviceSetting('motion').capability(['motionSensor']).name('Which Motion Sensors?');
            section.deviceSetting('contacts').capability(['contactSensor']).name('Which Contact Sensors?');

        });


    })
