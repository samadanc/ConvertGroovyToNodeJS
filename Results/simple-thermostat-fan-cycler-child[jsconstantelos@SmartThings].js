
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Use these thermostats', section => {
            section.deviceSetting('thermostats').capability(['thermostat']).name('Which thermos?');

        });


        page.section('Set ON and OFF minutes', section => {
            section.numberSetting('onMinutes').name('Stay on for how many minutes?');
            section.numberSetting('offMinutes').name('Stay off for how many minutes?');

        });


        page.section('Only for this mode', section => {
            section.enumSetting('activeMode').name('Which mode?');

        });


    })

    .updated(async (context, updateData) => {

    })
