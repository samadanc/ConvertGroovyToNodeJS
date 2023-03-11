
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When there\'s movement:', section => {
            section.deviceSetting('motion1').capability(['motionSensor']).name('Where?');

        });


        page.section('Text me at:', section => {

        });


        page.section('And text this number (optional):', section => {

        });


        page.section('But not if this door was opened recently:', section => {
            section.deviceSetting('contact1').capability(['contactSensor']).name('Which Door?');

        });


        page.section('Threshold for alert is:', section => {
            section.numberSetting('minutes').name('Minutes?');

        });


    })
