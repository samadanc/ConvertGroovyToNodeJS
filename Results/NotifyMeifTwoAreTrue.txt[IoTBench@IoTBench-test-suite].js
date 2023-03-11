
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Presence', section => {
            section.deviceSetting('presence').capability(['presenceSensor']).name('Pick a presence sensor');
            section.enumSetting('presenceState').name('Presence value');

        });


        page.section('Contact', section => {
            section.deviceSetting('contact').capability(['contactSensor']).name('Pick a contact sensor');
            section.enumSetting('contactState').name('Contact Value');

        });


        page.section('Switches', section => {
            section.deviceSetting('switches').capability(['switch']).name('Pick switch(es)');
            section.enumSetting('switchState').name('Switch(es) Value');

        });


        page.section('Motion', section => {
            section.deviceSetting('motion').capability(['motionSensor']).name('Pick a motion sensor');
            section.enumSetting('motionState').name('Motion Value');

        });


    })
