
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Switch to cycle every x minutes...', section => {
            section.deviceSetting('switch1').capability(['switch']).name('');

        });


        page.section('Automatically turn switch on for this long...', section => {
            section.numberSetting('minutesOn').name('On time (in minutes):');

        });


        page.section('Automatically turn switch off for this long...', section => {
            section.numberSetting('minutesOff').name('Off time (in minutes):');

        });


    })
