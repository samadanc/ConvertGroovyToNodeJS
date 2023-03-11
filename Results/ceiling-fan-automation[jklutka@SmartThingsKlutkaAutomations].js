
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Thermostat Setup', section => {
            section.deviceSetting('thermostat').capability(['thermostat']).name('Select your thermostat');
            section.enumSetting('triggerStates').name('Select your trigger operating states');

        });


        page.section('Fan Setup', section => {
            section.deviceSetting('fans').capability(['switch']).name('Select your Fans or Fan Switches');

        });


        page.section('Exception Conditions', section => {
            section.timeSetting('sleepTimeStart').name('Do NOT run Starting:');
            section.timeSetting('sleepTimeEnd').name('Ending:');
            section.deviceSetting('sleepMotion').capability(['motionSensor']).name('Do NOT run when motion has occured here:');

        });


    })
