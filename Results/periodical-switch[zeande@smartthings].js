
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section(''Choose an icon'', section => {

        });


        page.section('Trigger this switch...', section => {
            section.deviceSetting('switch1').capability(['switch']).name('Which switch?');

        });


        page.section('Start and stop times', section => {
            section.timeSetting('start').name('Start time?');
            section.timeSetting('stop').name('Stop time?');

        });


        page.section('On/Off cycle', section => {
            section.numberSetting('durationOn').name('On duration (minutes)?');
            section.numberSetting('durationOff').name('Off duration (minutes)?');

        });


    })
