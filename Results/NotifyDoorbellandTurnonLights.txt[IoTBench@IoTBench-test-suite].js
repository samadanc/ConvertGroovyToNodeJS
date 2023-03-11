
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Choose one or more, when...', section => {
            section.deviceSetting('contact').capability(['contactSensor']).name('Contact Closes');

        });


        page.section('Turn on these switches...', section => {
            section.deviceSetting('switches').capability(['switch']).name('Switches To Turn On');

        });


        page.section('Turn switches off after...', section => {
            section.numberSetting('minutesOff').name('Minutes');

        });


        page.section('Notification Settings', section => {
            section.enumSetting('sendPush').name('Send Push Notification?');
            section.textSetting('messageText').name('Message Text');

        });


    })
