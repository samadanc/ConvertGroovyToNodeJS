
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Thermostats', section => {
            section.deviceSetting('tstats').capability(['thermostat']).name('HVAC System');

        });


        page.section('Set how long (in minutes) you want the fan to run, minimum of 5 minutes.', section => {
            section.numberSetting('fanmins').name('Minutes to Run Fan');

        });


        page.section('['mobileOnly': true]', section => {

        });


    })

    .updated(async (context, updateData) => {

    })
