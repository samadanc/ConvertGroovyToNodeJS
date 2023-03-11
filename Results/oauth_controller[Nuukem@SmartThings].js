
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Allow Endpoint to Control These Things...', section => {
            section.deviceSetting('switches').capability(['switch']).name('Which Switches?');
            section.deviceSetting('locks').capability(['lock']).name('Which Locks?');
            section.deviceSetting('contact').capability(['contactSensor']).name('Which Contact?');
            section.deviceSetting('moisture').capability(['waterSensor']).name('Which Moisture?');
            section.deviceSetting('motion').capability(['motionSensor']).name('Which Motion?');
            section.deviceSetting('presence').capability(['presenceSensor']).name('Which Presence?');

        });


        page.section('IP:PORT of local endpoint', section => {

        });


    })
