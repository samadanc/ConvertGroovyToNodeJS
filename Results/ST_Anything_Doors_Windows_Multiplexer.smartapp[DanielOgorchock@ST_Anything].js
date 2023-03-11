
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select the House Doors (Virtual Contact Sensor devices)', section => {
            section.deviceSetting('frontdoor').capability(['contactSensor']).name('Virtual Contact Sensor for Front Door');
            section.deviceSetting('bedroomdoor').capability(['contactSensor']).name('Virtual Contact Sensor for Bedroom Door');
            section.deviceSetting('kitchendoor').capability(['contactSensor']).name('Virtual Contact Sensor for Kitchen Door');
            section.deviceSetting('garagedoor').capability(['contactSensor']).name('Virtual Contact Sensor for Garage Door');

        });


        page.section('Select the Windows (Virtual Contact Sensor devices)', section => {
            section.deviceSetting('kitchenwindow1').capability(['contactSensor']).name('Virtual Contact Sensor for Kitchen Window 1');
            section.deviceSetting('kitchenwindow2').capability(['contactSensor']).name('Virtual Contact Sensor for Kitchen Window 2');
            section.deviceSetting('kitchenwindow3').capability(['contactSensor']).name('Virtual Contact Sensor for Kitchen Window 3');
            section.deviceSetting('masterwindow1').capability(['contactSensor']).name('Virtual Contact Sensor for Master Window 1');
            section.deviceSetting('masterwindow2').capability(['contactSensor']).name('Virtual Contact Sensor for Master Window 2');
            section.deviceSetting('officewindow1').capability(['contactSensor']).name('Virtual Contact Sensor for Office Window 1');
            section.deviceSetting('officewindow2').capability(['contactSensor']).name('Virtual Contact Sensor for Office Window 2');
            section.deviceSetting('guestwindow1').capability(['contactSensor']).name('Virtual Contact Sensor for Guest Window 1');
            section.deviceSetting('guestwindow2').capability(['contactSensor']).name('Virtual Contact Sensor for Guest Window 2');

        });


        page.section('Select the Arduino ST_Anything_Doors_Windows device', section => {
            section.deviceSetting('arduino').capability(['contactSensor']).name('');

        });


    })

    .updated(async (context, updateData) => {

    })
