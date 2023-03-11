
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Garage door', section => {
            section.deviceSetting('doorSensor').capability(['contactSensor']).name('Which sensor?');
            section.deviceSetting('doorSwitch').capability(['switch']).name('Which switch?');

        });


        page.section('Presence(s) using this garage door', section => {
            section.deviceSetting('presences').capability(['presenceSensor']).name('Presence sensor');

        });


        page.section('Notifications', section => {
            section.numberSetting('openThreshold').name('Warn when open longer than...');

        });


        page.section('False alarm threshold (defaults to 10 min)', section => {
            section.numberSetting('falseAlarmThreshold').name('Number of minutes');

        });


        page.section('Allow Garage Opening Timeframe...', section => {
            section.timeSetting('time0').name('Start Time?');
            section.timeSetting('time1').name('End Time?');

        });


    })

    .updated(async (context, updateData) => {

    })
