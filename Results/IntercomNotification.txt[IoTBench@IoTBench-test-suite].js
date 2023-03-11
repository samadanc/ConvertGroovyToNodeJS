
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When this switch is on...', section => {
            section.deviceSetting('ArduinoSwitch').capability(['switch']).name('Intercom Buzzer Activated');

        });


        page.section('Send a push notification and/or an SMS message', section => {
            section.enumSetting('pushAndPhone').name('Also send an SMS?');

        });


        page.section('Minimum time between messages (optional, defaults to every message)', section => {

        });


    })
