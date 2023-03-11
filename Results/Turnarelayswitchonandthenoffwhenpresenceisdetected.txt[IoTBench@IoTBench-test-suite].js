
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Garage door', section => {
            section.deviceSetting('doorSensor').capability(['contactSensor']).name('Which sensor?');
            section.deviceSetting('doorSwitch').capability(['momentary']).name('Which switch?');

        });


        page.section('Car(s) using this garage door', section => {
            section.deviceSetting('car').capability(['presenceSensor']).name('Presence sensor');

        });


        page.section('False alarm threshold (defaults to 10 min)', section => {
            section.numberSetting('falseAlarmThreshold').name('Number of minutes the car needs to have been gone');

        });


    })

    .updated(async (context, updateData) => {

    })
