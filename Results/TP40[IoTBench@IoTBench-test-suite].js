
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Turn on these thermostats', section => {
            section.deviceSetting('thermostats').capability(['thermostat']).name('');

        });


        page.section('To which mode?', section => {
            section.enumSetting('turnOnTherm').name('');

        });


        page.section('For how long?', section => {

        });


    })

    .updated(async (context, updateData) => {

    })
