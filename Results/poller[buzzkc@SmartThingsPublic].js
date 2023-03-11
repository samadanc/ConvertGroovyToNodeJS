
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section(''About'', section => {

        });


        page.section('Scheduled Polling Group $n', section => {
            section.deviceSetting('group_$n').capability(['polling']).name('Select devices to be polled');
            section.deviceSetting('refresh_$n').capability(['refresh']).name('Select devices to be refreshed');
            section.numberSetting('interval_$n').name('Set polling interval (in minutes)');

        });


        page.section('REST API Polling Group', section => {
            section.booleanSetting('enableRestApi').name('Enable REST endpoint');
            section.deviceSetting('restPoll').capability(['polling']).name('Select devices to be polled');
            section.deviceSetting('restRefresh').capability(['refresh']).name('Select devices to be refreshed');

        });


    })
