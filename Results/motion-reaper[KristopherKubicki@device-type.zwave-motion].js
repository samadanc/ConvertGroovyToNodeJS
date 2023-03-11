
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Reap these devices...', section => {
            section.deviceSetting('reap_group').capability(['refresh']).name('Select devices to be reaped');

        });


        page.section('Every...', section => {
            section.numberSetting('reap_interval').name('Set reaping interval (in minutes)');

        });


    })
