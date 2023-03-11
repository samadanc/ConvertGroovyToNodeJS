
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Allow control of these things...', section => {
            section.deviceSetting('switches').capability(['switch']).name('Which Switches?');
            section.deviceSetting('locks').capability(['lock']).name('Which Locks?');

        });


        page.section('View state of these things...', section => {
            section.deviceSetting('contacts').capability(['contactSensor']).name('Which Contact?');
            section.deviceSetting('presence').capability(['presenceSensor']).name('Which Presence?');

        });


    })

    .updated(async (context, updateData) => {

    })
