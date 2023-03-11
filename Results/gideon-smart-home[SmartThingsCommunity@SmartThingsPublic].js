
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Control these contact sensors...', section => {
            section.deviceSetting('contact').capability(['contactSensor']).name('');

        });


        page.section('Control these switch levels...', section => {
            section.deviceSetting('switchlevels').capability(['switchLevel']).name('');

        });


        page.section('Control the color for these devices...', section => {
            section.deviceSetting('colors').capability(['colorControl']).name('');

        });


        page.section('Control the color temperature for these devices...', section => {
            section.deviceSetting('kelvin').capability(['colorTemperature']).name('');

        });


        page.section('Control these switches...', section => {
            section.deviceSetting('switches').capability(['switch']).name('');

        });


        page.section('Control these smoke alarms...', section => {
            section.deviceSetting('smoke_alarms').capability(['smokeDetector']).name('');

        });


        page.section('Control these window shades...', section => {
            section.deviceSetting('shades').capability(['windowShade']).name('');

        });


        page.section('Control these garage doors...', section => {
            section.deviceSetting('garage').capability(['garageDoorControl']).name('');

        });


        page.section('Control these water sensors...', section => {
            section.deviceSetting('water_sensors').capability(['waterSensor']).name('');

        });


        page.section('Control these motion sensors...', section => {
            section.deviceSetting('motions').capability(['motionSensor']).name('');

        });


        page.section('Control these presence sensors...', section => {
            section.deviceSetting('presence_sensors').capability(['presenceSensor']).name('');

        });


        page.section('Control these outlets...', section => {
            section.deviceSetting('outlets').capability(['outlet']).name('');

        });


        page.section('Control these power meters...', section => {
            section.deviceSetting('meters').capability(['powerMeter']).name('');

        });


        page.section('Control these locks...', section => {
            section.deviceSetting('locks').capability(['lock']).name('');

        });


        page.section('Control these temperature sensors...', section => {
            section.deviceSetting('temperature_sensors').capability(['temperatureMeasurement']).name('');

        });


        page.section('Control these batteries...', section => {
            section.deviceSetting('batteries').capability(['battery']).name('');

        });


    })
