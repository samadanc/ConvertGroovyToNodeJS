
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select Devices', section => {
            section.deviceSetting('virtualSwitch').capability(['switch']).name('Select Switch');

        });


        page.section('Select HS3 Device', section => {
            section.deviceSetting('HomeSeer').capability(['actuator']).name('HomeSeer');

        });


        page.section('Enter Corresponding HomeSeer Device ID', section => {
            section.textSetting('HomeSeerId').name('HomeSeer Device ID');

        });


    })
