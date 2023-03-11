
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Allow access to these Dimmer Switches and Outlets', section => {
            section.deviceSetting('switches').capability(['switch']).name('');

        });


        page.section('Allow access to these Open/Close Sensors', section => {
            section.deviceSetting('contactSensors').capability(['contactSensor']).name('');

        });


        page.section('Allow access to these Motion Sensors', section => {
            section.deviceSetting('motionSensors').capability(['motionSensor']).name('');

        });


        page.section('Allow access to these Z-Wave Locks', section => {
            section.deviceSetting('locks').capability(['lock']).name('');

        });


    })
