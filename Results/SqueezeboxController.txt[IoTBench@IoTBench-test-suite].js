
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When there\'s movement...', section => {
            section.deviceSetting('motion1').capability(['motionSensor']).name('Where?');

        });


        page.section('Squeezebox/Logitech Server...', section => {
            section.textSetting('ip').name('IP Address?');
            section.numberSetting('port').name('Port?');

        });


        page.section('Anytime after...', section => {
            section.timeSetting('timeAfter').name('When?');
            section.numberSetting('afterSetVolumeTo').name('Set Volume to (0-100)?');
            section.numberSetting('afterSleepMinutes').name('Sleep Timer (in minutes)?');

        });


        page.section('Anytime before...', section => {
            section.timeSetting('timeBefore').name('When?');
            section.numberSetting('beforeSetVolumeTo').name('Set Volume to (0-100)?');
            section.numberSetting('beforeSleepMinutes').name('Sleep Timer (in minutes)?');

        });


    })
