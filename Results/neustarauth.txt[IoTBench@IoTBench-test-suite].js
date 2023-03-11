
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Allow a web application to control these things...', section => {
            section.deviceSetting('switches').capability(['switch']).name('Which  Switches?');
            section.deviceSetting('presences').capability(['presenceSensor']).name('Which  presence Sensors?');
            section.deviceSetting('motions').capability(['motionSensor']).name('Which  Motion Sensors?');
            section.deviceSetting('contacts').capability(['contactSensor']).name('Which  Contact Sensors?');

        });


    })
