
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When someone\'s around because of...', section => {
            section.deviceSetting('motionSensors').capability(['motionSensor']).name('Motion here');
            section.deviceSetting('presenceSensors').capability(['presenceSensor']).name('And (optionally) these sensors being present');

        });


        page.section('Turn on these outlet(s)', section => {
            section.deviceSetting('outlets').capability(['switch']).name('Which?');

        });


        page.section('For this amount of time', section => {
            section.numberSetting('minutes').name('Minutes?');

        });


    })
