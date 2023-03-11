
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Which sensors monitor the washer and dryer?', section => {
            section.deviceSetting('laundry_devices').capability(['powerMeter']).name('Choose the washer and dryer power meters');

        });


        page.section('Choose the virtual switches to turn on/off when voltage changes are detected in the laundry room.', section => {
            section.deviceSetting('virtual_laundry_devices').capability(['switch']).name('Choose the virtual washer and dryer switches');

        });


        page.section('Configure how the garage door should be monitored.', section => {
            section.deviceSetting('garage_sensor').capability(['sensor']).name('Choose the garage door sensor to monitor');
            section.timeSetting('garage_door_check_time').name('Choose a time to check to see if the garage door is open each day');

        });


        page.section('Which lights should change color?', section => {
            section.deviceSetting('lights').capability(['colorControl']).name('Choose the color changing lights');

        });


    })
