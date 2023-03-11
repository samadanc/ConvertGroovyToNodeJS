
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Zones Mode', section => {
            section.deviceSetting('zone_$n').capability(['motionSensor']).name('Zone $n');
            section.numberSetting('window').name('Window period (seconds)');

        });


    })
