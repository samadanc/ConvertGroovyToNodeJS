
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When Mail Arrives...', section => {
            section.deviceSetting('acceleration').capability(['accelerationSensor']).name('Where?');

        });


        page.section('Then send this message in a push notification', section => {
            section.textSetting('messageText').name('Message Text');

        });


        page.section('And as text message to this number (optional)', section => {

        });


    })
