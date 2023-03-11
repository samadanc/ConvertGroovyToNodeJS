
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {
            section.timeSetting('timeOffDay').name('Time to turn off');
            section.timeSetting('timeOnDay').name('Time to turn back on');
            section.enumSetting('dayOff').name('Run on certain days of the week...');

        });


        page.section('', section => {
            section.timeSetting('timeOffNight').name('Time to turn off');
            section.timeSetting('timeOnNight').name('Time to turn back on');
            section.enumSetting('nightOff').name('Run on certain days of the week...');

        });


        page.section('', section => {

        });


        page.section(''Instructions'', section => {

        });


    })
