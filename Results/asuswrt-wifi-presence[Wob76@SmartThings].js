
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select Devices', section => {
            section.deviceSetting('presence').capability(['presenceSensor']).name('Select Virtual Presence Sensor');
            section.numberSetting('timeout').name('Number of Minutes WIFI says Away Before Actually Marked Away');

        });


    })
