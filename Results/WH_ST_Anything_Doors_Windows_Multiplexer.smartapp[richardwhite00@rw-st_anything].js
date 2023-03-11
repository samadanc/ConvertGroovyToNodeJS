
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select the Windows (Virtual Contact Sensor devices)', section => {
            section.deviceSetting('bfstNookWindow').capability(['contactSensor']).name('Virtual Contact Sensor for Breakfast Nook Window');
            section.deviceSetting('diningRoomWindow').capability(['contactSensor']).name('Virtual Contact Sensor for Dining Room Window');
            section.deviceSetting('masterwindow1').capability(['contactSensor']).name('Virtual Contact Sensor for Master Window 1');
            section.deviceSetting('masterwindow2').capability(['contactSensor']).name('Virtual Contact Sensor for Master Window 2');
            section.deviceSetting('masterBathWindow').capability(['contactSensor']).name('Virtual Contact Sensor for Master Bathroom Window');

        });


        page.section('Select the Arduino ST_Anything_Doors_Windows device', section => {
            section.deviceSetting('arduino').capability(['contactSensor']).name('');

        });


    })

    .updated(async (context, updateData) => {

    })
