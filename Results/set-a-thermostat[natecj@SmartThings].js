
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Global Settings', section => {
            section.deviceSetting('activeThermostat').capability(['thermostat']).name('Thermostat');

        });


        page.section('Active Settings', section => {
            section.numberSetting('activeHeatingSetpoint').name('Heat Setting');
            section.numberSetting('activeCoolingSetpoint').name('Cool Setting');

        });


        page.section('Inactive Settings', section => {
            section.numberSetting('inactiveHeatingSetpoint').name('Heat Setting');
            section.numberSetting('inactiveCoolingSetpoint').name('Cool Setting');

        });


    })

    .updated(async (context, updateData) => {

    })
