
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When these motion sensors detect motion...', section => {
            section.deviceSetting('motion').capability(['motionSensor']).name('Motion Sensor?');

        });


        page.section('Or at these times...', section => {
            section.timeSetting('time1').name('When?');
            section.timeSetting('time2').name('When?');

        });


        page.section('On these days...', section => {
            section.booleanSetting('everyDay').name('Everyday?');
            section.enumSetting('days').name('');

        });


        page.section('Then flash...', section => {
            section.deviceSetting('switches').capability(['switch']).name('These lights');
            section.numberSetting('numFlashes').name('This number of times (default 3)');

        });


        page.section('Time settings in milliseconds (optional)...', section => {
            section.numberSetting('onFor').name('On for (default 1000)');
            section.numberSetting('offFor').name('Off for (default 1000)');

        });


    })

    .updated(async (context, updateData) => {

    })
