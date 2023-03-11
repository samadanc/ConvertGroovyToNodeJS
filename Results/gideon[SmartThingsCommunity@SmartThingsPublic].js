
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Control these switches...', section => {
            section.deviceSetting('switches').capability(['switch']).name('');

        });


        page.section('Control these motion sensors...', section => {
            section.deviceSetting('motions').capability(['motionSensor']).name('');

        });


        page.section('Control these presence sensors...', section => {
            section.deviceSetting('presence_sensors').capability(['presenceSensor']).name('');

        });


        page.section('Control these outlets...', section => {
            section.deviceSetting('outlets').capability(['switch']).name('');

        });


        page.section('Control these locks...', section => {
            section.deviceSetting('locks').capability(['lock']).name('');

        });


        page.section('Control these locks...', section => {
            section.deviceSetting('temperature_sensors').capability(['temperatureMeasurement']).name('');

        });


    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('outletHandler', (context, event) => {
        
        console.log("${outlet.currentEnergy}")
        

	})
