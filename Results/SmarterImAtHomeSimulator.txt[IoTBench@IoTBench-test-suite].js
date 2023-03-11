
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Light switches to turn on/off', section => {
            section.deviceSetting('switches').capability(['switch']).name('Switches');

        });


        page.section('How often to cycle the lights', section => {
            section.numberSetting('frequency_minutes').name('Minutes?');

        });


        page.section('Number of actives lights at any given time', section => {
            section.numberSetting('number_of_active_lights').name('Number of active lights');

        });


    })
