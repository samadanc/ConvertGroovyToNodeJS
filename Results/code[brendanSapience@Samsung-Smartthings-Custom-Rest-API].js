
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Allow external service to control these switches...', section => {
            section.deviceSetting('switches').capability(['switch']).name('');

        });


        page.section('Allow external service to control these alarms...', section => {
            section.deviceSetting('alarms').capability(['alarm']).name('');

        });


        page.section('Allow external service to control these color enabled devices...', section => {
            section.deviceSetting('colors').capability(['colorControl']).name('');

        });


        page.section('Allow external service to control these contact sensors...', section => {
            section.deviceSetting('contacts').capability(['contactSensor']).name('');

        });


        page.section('Allow external service to control these illuminance sensors...', section => {
            section.deviceSetting('illuminances').capability(['illuminanceMeasurement']).name('');

        });


        page.section('Allow external service to control these locks ...', section => {
            section.deviceSetting('locks').capability(['lock']).name('');

        });


        page.section('Allow external service to control these Motion sensors ...', section => {
            section.deviceSetting('motions').capability(['motionSensor']).name('');

        });


        page.section('Allow external service to control these presence sensors ...', section => {
            section.deviceSetting('presences').capability(['presenceSensor']).name('');

        });


        page.section('Allow external service to control these devices with refreshes ...', section => {
            section.deviceSetting('refreshes').capability(['refresh']).name('');

        });


        page.section('Allow external service to control these temperature sensors ...', section => {
            section.deviceSetting('temperatures').capability(['temperatureMeasurement']).name('');

        });


        page.section('Allow external service to control these vibration sensors ...', section => {
            section.deviceSetting('shocks').capability(['shockSensor']).name('');

        });


    })
