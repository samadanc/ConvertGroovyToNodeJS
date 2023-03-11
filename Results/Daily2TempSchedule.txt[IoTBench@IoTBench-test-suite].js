
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Thermostat', section => {
            section.deviceSetting('thermostat').capability(['thermostat']).name('Which?');

        });


        page.section('Daytime', section => {
            section.timeSetting('daytime').name('At Time');

        });


        page.section('Nighttime', section => {
            section.timeSetting('nighttime').name('At Time');

        });


    })
