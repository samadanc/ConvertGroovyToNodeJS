
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When I arrive...', section => {
            section.deviceSetting('presences').capability(['presenceSensor']).name('Who?');

        });


        page.section('These devices are switched on...', section => {
            section.deviceSetting('switches').capability(['switch']).name('Choose switches or lights:');

        });


        page.section('Turn off again after...', section => {
            section.numberSetting('minutesLater').name('Minutes:');

        });


    })
