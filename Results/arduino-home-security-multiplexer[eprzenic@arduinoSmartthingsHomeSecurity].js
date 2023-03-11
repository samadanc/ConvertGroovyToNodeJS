
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select the Motion Sensors (Virtual Motion Sensor devices)', section => {
            section.deviceSetting('hallway').capability(['motionSensor']).name('Hallway Motion Sensor');

        });


        page.section('Select the House Doors (Virtual Contact Sensor devices)', section => {
            section.deviceSetting('frontdoor').capability(['contactSensor']).name('Virtual Contact Sensor for Front Door');
            section.deviceSetting('backdoor').capability(['contactSensor']).name('Virtual Contact Sensor for Back Door');
            section.deviceSetting('sidedoor').capability(['contactSensor']).name('Virtual Contact Sensor for Dining Room Door');

        });


        page.section('Select the Arduino Home Security device', section => {
            section.deviceSetting('arduino').capability(['contactSensor']).name('');

        });


    })

    .updated(async (context, updateData) => {

    })
