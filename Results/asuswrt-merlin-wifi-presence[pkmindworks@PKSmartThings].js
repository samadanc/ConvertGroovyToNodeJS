
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select Devices', section => {
            section.deviceSetting('virtualPresenceDevices').capability(['presenceSensor']).name('Select Virtual Presence Sensors');

        });


    })
