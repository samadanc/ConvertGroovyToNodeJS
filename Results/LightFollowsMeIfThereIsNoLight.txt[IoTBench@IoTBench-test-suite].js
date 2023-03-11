
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Turn on when...', section => {
            section.deviceSetting('motion1').capability(['motionSensor']).name('Where?');
            section.deviceSetting('contact').capability(['contactSensor']).name('Contact Opens');

        });


        page.section('And off when there\'s been no movement for...', section => {
            section.numberSetting('minutes1').name('Minutes?');

        });


        page.section('If the light intensity on...', section => {
            section.deviceSetting('lightSensor1').capability(['illuminanceMeasurement']).name('');

        });


        page.section('is lest than...', section => {
            section.numberSetting('lux1').name('Lux?');

        });


        page.section('Turn on/off light(s)...', section => {
            section.deviceSetting('switches').capability(['switch']).name('');

        });


    })
