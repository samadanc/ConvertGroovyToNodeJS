
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Choose thermostat... ', section => {
            section.deviceSetting('thermostat').capability(['thermostat']).name('');

        });


        page.section('Air conditioning starts at...', section => {

        });


        page.section('And cools to...', section => {

        });


        page.section('Optionally choose temperature sensor to use instead of the thermostat\'s... ', section => {
            section.deviceSetting('sensor').capability(['temperatureMeasurement']).name('Temp Sensors');

        });


        page.section('Prevent Tampering During This Mode...', section => {

        });


        page.section('Via a push notification and/or an SMS message', section => {
            section.enumSetting('pushAndPhone').name('Both Push and SMS?');

        });


    })
