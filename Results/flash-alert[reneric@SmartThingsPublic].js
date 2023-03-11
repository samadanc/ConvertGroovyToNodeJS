
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('On these days...', section => {
            section.booleanSetting('everyDay').name('Everyday?');
            section.enumSetting('day1').name('');
            section.enumSetting('day2').name('');

        });


        page.section('At these times...', section => {
            section.timeSetting('time1').name('When?');
            section.timeSetting('time2').name('When?');

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
