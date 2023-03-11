
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When the mode changes to...', section => {

        });


        page.section('Change the following thermostats ...', section => {
            section.deviceSetting('thermostat').capability(['thermostat']).name('Thermostat');

        });


        page.section('Mode', section => {
            section.enumSetting('thermostatMode').name('What thermostat mode?');

        });


        page.section('Set the thermostat to the following temps', section => {
            section.numberSetting('heatingTemp').name('Heating Temp?');
            section.numberSetting('coolingTemp').name('Cooling Temp?');

        });


    })

    .updated(async (context, updateData) => {

    })
