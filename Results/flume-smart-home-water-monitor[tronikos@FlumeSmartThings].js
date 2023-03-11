
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Login', section => {

        });


        page.section('Alert options', section => {
            section.booleanSetting('wetOnAnyUsageAlert').name('Wet on any usage alert?');
            section.booleanSetting('wetOnlyOnUnreadAlerts').name('Wet only on unread alerts?');

        });


        page.section('Polling options', section => {
            section.enumSetting('pollAlertsEveryMinutes').name('How often to poll for alerts?');
            section.enumSetting('pollWaterUsageEveryMinutes').name('How often to poll for water usage?');
            section.enumSetting('pollDevicesEveryMinutes').name('How often to poll for new devices and infrequently changed attributes such as battery?');

        });


        page.section('Local Proxy', section => {
            section.textSetting('proxyHost').name('Proxy Host');

        });


        page.section('Other options', section => {
            section.enumSetting('configLoggingLevelIDE').name('IDE Live Logging Level');

        });


    })
