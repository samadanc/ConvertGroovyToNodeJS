
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select Devices', section => {
            section.deviceSetting('ContactSensor').capability(['contactSensor']).name('Select ST Contact Sensor');

        });


        page.section('Select HomeSeer Device', section => {
            section.deviceSetting('HomeSeer').capability(['actuator']).name('HomeSeer');

        });


        page.section('Enter Corresponding HomeSeer Device ID', section => {
            section.textSetting('HS3Id').name('HomeSeer Device ID');

        });


    })
