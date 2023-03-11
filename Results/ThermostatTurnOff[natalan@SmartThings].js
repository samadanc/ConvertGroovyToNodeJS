
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When the mode changes to...', section => {

        });


        page.section('Turn off these thermostats', section => {
            section.deviceSetting('thermostats').capability(['thermostat']).name('');
            section.booleanSetting('notify').name('Notify?');

        });


        page.section('Only between these times...', section => {
            section.timeSetting('startTime').name('Start Time');
            section.timeSetting('endTime').name('End Time');

        });


    })

    .updated(async (context, updateData) => {

    })
