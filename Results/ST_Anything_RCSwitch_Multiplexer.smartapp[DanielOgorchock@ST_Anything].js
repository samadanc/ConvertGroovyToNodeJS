
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select the Switches (Virtual Switch devices)', section => {
            section.deviceSetting('virtual_switch_1').capability(['switch']).name('Virtual Switch for RCSwitch 1');
            section.deviceSetting('virtual_switch_2').capability(['switch']).name('Virtual Switch for RCSwitch 2');
            section.deviceSetting('virtual_switch_3').capability(['switch']).name('Virtual Switch for RCSwitch 3');

        });


        page.section('Select the Arduino ST_Anything_RCSwitch device', section => {
            section.deviceSetting('arduino').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

    })
