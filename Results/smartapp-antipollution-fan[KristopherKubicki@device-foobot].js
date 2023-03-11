
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Pollution Sensors', section => {
            section.deviceSetting('ppmeter').capability(['sensor']).name('Which');

        });


        page.section('Thermostat Fans', section => {
            section.deviceSetting('ttfans').capability(['thermostat']).name('Which?');

        });


    })
