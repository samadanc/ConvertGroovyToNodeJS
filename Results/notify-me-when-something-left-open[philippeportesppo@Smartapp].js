
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Choose one or more, when...', section => {
            section.deviceSetting('contact').capability(['contactSensor']).name('Contact Opens');
            section.deviceSetting('mySwitch').capability(['switch']).name('Switch Turned On');
            section.deviceSetting('garageDoor').capability(['contactSensor']).name('Garage Opens');

        });


        page.section('Send this message (optional, sends standard status message if not specified)', section => {
            section.textSetting('messageText').name('Message Text');

        });


        page.section('Via a push notification and/or an SMS message', section => {
            section.enumSetting('pushAndPhone').name('Notify me via Push Notification');

        });


        page.section('Via siren beep', section => {
            section.deviceSetting('siren').capability(['alarm']).name('Siren Alarm');

        });


        page.section('Minimum time between messages (optional, defaults to every message)', section => {

        });


    })

    .updated(async (context, updateData) => {

    })
