
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('About', section => {

        });


        page.section('Logging', section => {
            section.booleanSetting('isLogLevelTrace').name('Show trace log level ?\n');
            section.booleanSetting('isLogLevelDebug').name('Show debug log level ?\n');

        });


        page.section('Allow external service to control these things...', section => {
            section.deviceSetting('notification').capability(['notification']).name('Notifications...');
            section.deviceSetting('button').capability(['button']).name('Buttons...');

        });


        page.section(''Other'', section => {

        });


    })
