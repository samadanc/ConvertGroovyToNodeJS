
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('People to watch for?', section => {
            section.deviceSetting('people').capability(['presenceSensor']).name('');

        });


        page.section('Front Door?', section => {
            section.deviceSetting('sensors').capability(['contactSensor']).name('');

        });


        page.section('Hall Light?', section => {
            section.deviceSetting('lights').capability(['switch']).name('Switch Turned On');

        });


        page.section('Presence Delay (defaults to 30s)?', section => {
            section.numberSetting('presenceDelay').name('How Long?');

        });


        page.section('Door Contact Delay (defaults to 10s)?', section => {
            section.numberSetting('contactDelay').name('How Long?');

        });


    })
