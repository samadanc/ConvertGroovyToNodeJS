
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


        page.section('Turn off/on light(s)...', section => {
            section.deviceSetting('switches').capability(['switch']).name('');

        });


    })
