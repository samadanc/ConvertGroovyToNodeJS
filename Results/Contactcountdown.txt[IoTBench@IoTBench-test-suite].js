
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Initiate countdown from contact sensor', section => {
            section.deviceSetting('myContact').capability(['contactSensor']).name('');

        });


        page.section('Initiate countdown on switch open', section => {
            section.deviceSetting('mySwitch').capability(['switch']).name('');

        });


        page.section('Countdown this many seconds', section => {
            section.numberSetting('delaySeconds').name('Seconds?');

        });


        page.section('Initial switch state', section => {
            section.booleanSetting('firstState').name('First set the switch to:');

        });


        page.section('Final switch state', section => {
            section.booleanSetting('finalState').name('Upon reaching countdown, set switch to:');

        });


    })

    .updated(async (context, updateData) => {

    })
