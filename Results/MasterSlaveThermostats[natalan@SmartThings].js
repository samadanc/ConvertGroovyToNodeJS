
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Master thermostat', section => {
            section.deviceSetting('master').capability(['thermostat']).name('');

        });


        page.section('Controls this thermostat', section => {
            section.deviceSetting('slave').capability(['thermostat']).name('');
            section.numberSetting('tempThreshold').name('Temperature Difference for slave to turn on');
            section.booleanSetting('notify').name('Notify?');

        });


    })
