
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Turn off when there\'s movement...', section => {
            section.deviceSetting('motions').capability(['motionSensor']).name('Where?');

        });


        page.section('And on when there\'s been no movement for...', section => {
            section.numberSetting('minutes1').name('Minutes?');

        });


        page.section('Turn off/on light(s) or switches...', section => {
            section.deviceSetting('switches').capability(['switch']).name('');

        });


        page.section('Alert threshold before triggering', section => {
            section.numberSetting('alertThreshold').name('Number of Alert?');

        });


        page.section('Alert threshold timeout', section => {
            section.numberSetting('waitSeconds').name('Timeout of alert threshold in Seconds?');

        });


    })
