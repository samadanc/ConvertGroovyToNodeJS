
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select Devices', section => {
            section.deviceSetting('Switch').capability(['switch']).name('Select ST Switch');

        });


        page.section('Select Homeseer HS3 Device', section => {
            section.deviceSetting('HomeSeer').capability(['actuator']).name('HomeSeer');

        });


        page.section('Enter Corresponding HomeSeer Device ID', section => {
            section.textSetting('HomeSeerId').name('HomeSeer Device ID');

        });


    })
