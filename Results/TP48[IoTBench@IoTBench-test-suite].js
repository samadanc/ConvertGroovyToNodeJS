
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When I arrive and leave...', section => {
            section.deviceSetting('presence1').capability(['presenceSensor']).name('Who?');

        });


        page.section('Turn on/off a light...', section => {
            section.deviceSetting('switch1').capability(['switch']).name('');

        });


        page.section('For this amount of time (enter 0 for indefinite)', section => {
            section.numberSetting('minutes').name('Minutes?');

        });


        page.section('After this time of day', section => {
            section.timeSetting('timeOfDay').name('Time?');

        });


    })
