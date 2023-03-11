
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select the Garage Doors (Virtual Door Control devices)', section => {
            section.deviceSetting('leftdoor').capability(['doorControl']).name('Left Garage Door');
            section.deviceSetting('rightdoor').capability(['doorControl']).name('Right Garage Door');

        });


        page.section('Select the House Doors (Virtual Contact Sensor devices)', section => {
            section.deviceSetting('frontdoor').capability(['contactSensor']).name('Virtual Contact Sensor for Front Door');
            section.deviceSetting('backdoor').capability(['contactSensor']).name('Virtual Contact Sensor for Back Door');
            section.deviceSetting('kitchendoor').capability(['contactSensor']).name('Virtual Contact Sensor for Kitchen Door');
            section.deviceSetting('garagesidedoor').capability(['contactSensor']).name('Virtual Contact Sensor for Garage Side Door');

        });


        page.section('Select the Virtual Temperature/Humidity devices', section => {
            section.deviceSetting('temphumid_1').capability(['temperatureMeasurement']).name('1st Temp-Humidity Sensor');

        });


        page.section('Select the Arduino ST_Anything_Doors device', section => {
            section.deviceSetting('arduino').capability(['contactSensor']).name('');

        });


    })

    .updated(async (context, updateData) => {

    })
