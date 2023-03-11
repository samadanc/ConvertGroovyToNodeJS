
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When...', section => {
            section.deviceSetting('arrivalPresence').capability(['presenceSensor']).name('One of these people arrives:');
            section.deviceSetting('departurePresence').capability(['presenceSensor']).name('One of these people departs:');

        });


        page.section('Between...', section => {
            section.timeSetting('from').name('This time:');
            section.timeSetting('to').name('And this time:');

        });


        page.section('Send this message...', section => {
            section.textSetting('messageText').name('Message Text');

        });


        page.section('To these people...', section => {

        });


    })
