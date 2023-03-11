
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Switch To Control', section => {
            section.deviceSetting('realswitch').capability(['switch']).name('Switch To Control...');

        });


        page.section('Motion Sensor', section => {
            section.deviceSetting('sensor').capability(['motionSensor']).name('Motion Sensor');
            section.numberSetting('auto_off_delay').name('Auto Off Delay');

        });


        page.section('Active Window', section => {
            section.timeSetting('from_time').name('From');
            section.timeSetting('to_time').name('Until');

        });


    })
