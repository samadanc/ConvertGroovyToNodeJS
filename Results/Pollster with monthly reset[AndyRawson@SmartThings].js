
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section(''About'', section => {

        });


        page.section('Polling Group 1', section => {
            section.deviceSetting('group_1').capability(['polling']).name('Select devices to be polled');
            section.deviceSetting('refresh_1').capability(['refresh']).name('Select devices to be refreshed');
            section.numberSetting('interval_1').name('Set polling interval (in minutes)');

        });


        page.section('Polling Group 2', section => {
            section.deviceSetting('group_2').capability(['polling']).name('Select devices to be polled');
            section.deviceSetting('refresh_2').capability(['refresh']).name('Select devices to be refreshed');
            section.numberSetting('interval_2').name('Set polling interval (in minutes)');

        });


        page.section('Polling Group 3', section => {
            section.deviceSetting('group_3').capability(['polling']).name('Select devices to be polled');
            section.deviceSetting('refresh_3').capability(['refresh']).name('Select devices to be refreshed');
            section.numberSetting('interval_3').name('Set polling interval (in minutes)');

        });


        page.section('Polling Group 4 (Monthly Reset)', section => {
            section.deviceSetting('group_4').capability(['polling']).name('Select devices to be polled');
            section.deviceSetting('refresh_4').capability(['refresh']).name('Select devices to be reset');
            section.numberSetting('interval_4').name('Set polling day of the month');

        });


        page.section('Phone number to send Power report to:', section => {

        });


    })
