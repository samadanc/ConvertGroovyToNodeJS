
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When Someone Knocks?', section => {
            section.deviceSetting('knockSensor').capability(['accelerationSensor']).name('Where?');

        });


        page.section('But not when they open this door?', section => {
            section.deviceSetting('openSensor').capability(['contactSensor']).name('Where?');

        });


        page.section('Knock Delay (defaults to 5s)?', section => {
            section.numberSetting('knockDelay').name('How Long?');

        });


        page.section('Minimum time between messages (optional, defaults to every message)', section => {
            section.numberSetting('frequency').name('Minutes');

        });


        page.section('Virtual Switch to Turn On', section => {
            section.deviceSetting('vSwitch').capability(['switch']).name('Switch Device');

        });


    })
