
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Monitor these contact sensors', section => {
            section.deviceSetting('contact').capability(['contactSensor']).name('');

        });


        page.section('Disable the keypad on which thermostats?', section => {
            section.deviceSetting('thermostat').capability(['thermostat']).name('');

        });


    })

    .updated(async (context, updateData) => {

    })
