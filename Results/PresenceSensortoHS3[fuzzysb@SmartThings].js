
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select Devices', section => {
            section.deviceSetting('PresenceSensor').capability(['presenceSensor']).name('Select ST Presence Sensor');

        });


        page.section('Select HomeSeer Device', section => {
            section.deviceSetting('HomeSeer').capability(['actuator']).name('HomeSeer');

        });


        page.section('Enter Corresponding HS3 Device ID', section => {
            section.textSetting('HS3Id').name('HS3 Device ID');

        });


    })
