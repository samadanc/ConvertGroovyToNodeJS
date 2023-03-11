
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Choose devices...', section => {
            section.deviceSetting('contact').capability(['contactSensor']).name('Devices supporting tamper');

        });


        page.section('Via a push notification and/or an SMS message', section => {
            section.enumSetting('pushAndPhone').name('Both Push and SMS?');

        });


        page.section('Sound these alarms...', section => {
            section.deviceSetting('alarms').capability(['alarm']).name('Alarm Devices');

        });


    })
