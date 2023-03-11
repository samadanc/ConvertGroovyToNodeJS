
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {
            section.timeSetting('starting').name('Starting');
            section.timeSetting('ending').name('Ending');

        });


        page.section('Notifications', section => {
            section.booleanSetting('sendPushMessageAll').name('Bypass all notifications?');

        });


        page.section('['hideable': true, 'hidden': true], 'More options', section => {
            section.enumSetting('days').name('Only on certain days of the week');

        });


    })
