
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Thermostat to control', section => {
            section.deviceSetting('thermostat').capability(['thermostat']).name('');
            section.enumSetting('thermoStatMode').name('Thermostate mode');

        });


        page.section('When we are home during the day', section => {
            section.numberSetting('heatingSetpointHomeDay').name('Heating Degrees Fahrenheit?');
            section.numberSetting('coolingSetpointHomeDay').name('Cooling Degrees Fahrenheit?');

        });


        page.section('When we are sleeping', section => {
            section.numberSetting('heatingSetpointSleeping').name('Heating Degrees Fahrenheit?');
            section.numberSetting('coolingSetpointSleeping').name('Cooling Degrees Fahrenheit?');

        });


        page.section('When we are away', section => {
            section.numberSetting('heatingSetpointAway').name('Heating Degrees Fahrenheit?');
            section.numberSetting('coolingSetpointAway').name('Cooling Degrees Fahrenheit?');

        });


    })

    .updated(async (context, updateData) => {

    })
