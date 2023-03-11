
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When I arrive...(optional)', section => {
            section.deviceSetting('presence').capability(['presenceSensor']).name('Who?');

        });


        page.section('When this door opens...(optional)', section => {
            section.deviceSetting('contact').capability(['contactSensor']).name('Where?');

        });


        page.section('When there is motion...(optional)', section => {
            section.deviceSetting('motion').capability(['motionSensor']).name('Motion Here');

        });


        page.section('Turn on this light(s)...', section => {
            section.deviceSetting('switches').capability(['switch']).name('');

        });


        page.section('Turn off after how many minutes?', section => {
            section.numberSetting('time').name('Enter 0 to not auto-off');

        });


        page.section('But only after dark for this area.', section => {
            section.numberSetting('zip').name('Zip Code');

        });


    })
