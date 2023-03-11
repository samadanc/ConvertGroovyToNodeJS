
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When the door opens or closes...', section => {
            section.deviceSetting('contact').capability(['contactSensor']).name('Door Contact');

        });


        page.section('Send message via push notification', section => {
            section.textSetting('openText').name('Open Message');
            section.textSetting('closedText').name('Closed Message');

        });


        page.section('And as text message to this number (optional)', section => {

        });


    })
