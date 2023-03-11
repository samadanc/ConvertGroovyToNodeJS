
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Disable?', section => {
            section.booleanSetting('disableLogic').name('Disable Logic?');

        });


        page.section('When this device stops drawing power', section => {
            section.deviceSetting('meter').capability(['powerMeter']).name('');
            section.numberSetting('DeviceNotRunning').name('Device not running when power drops below (W)');
            section.timeSetting('timeBegin').name('Time of Day to start');
            section.timeSetting('timeEnd').name('Time of Day to stop');

        });


        page.section('Turn off these switches...', section => {
            section.deviceSetting('switches').capability(['switch']).name('');

        });


        page.section('Debug?', section => {
            section.booleanSetting('debugMessages').name('Debug Messages?');

        });


        page.section('Polling Group $n', section => {
            section.deviceSetting('group_$n').capability(['polling']).name('Select devices to be polled');
            section.numberSetting('interval_$n').name('Set polling interval (in minutes)');

        });


    })
