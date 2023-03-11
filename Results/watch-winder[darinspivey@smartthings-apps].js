
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Power Outlet', section => {
            section.deviceSetting('watchWinder').capability(['outlet']).name('This is the power outlet that the watch winder is connected to.');

        });


        page.section('Timer Configuration', section => {
            section.numberSetting('hoursOff').name('Hours Off');
            section.numberSetting('hoursOn').name('Hours On');

        });


        page.section('Options', section => {
            section.booleanSetting('startInOff').name('Start with winder off?');
            section.booleanSetting('logToNotifications').name('Show status in the log?');
            section.numberSetting('statusFrequency').name('Status every N hours:');
            section.booleanSetting('DST').name('is Daylight Savings on?');

        });


    })
