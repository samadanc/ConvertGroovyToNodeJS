
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select the Relays (Virtual Switch devices)', section => {
            section.deviceSetting('virtual_switch_1').capability(['switch']).name('Virtual Switch for Relay 1');
            section.deviceSetting('virtual_switch_2').capability(['switch']).name('Virtual Switch for Relay 2');
            section.deviceSetting('virtual_switch_3').capability(['switch']).name('Virtual Switch for Relay 3');
            section.deviceSetting('virtual_switch_4').capability(['switch']).name('Virtual Switch for Relay 4');
            section.deviceSetting('virtual_switch_5').capability(['switch']).name('Virtual Switch for Relay 5');
            section.deviceSetting('virtual_switch_6').capability(['switch']).name('Virtual Switch for Relay 6');
            section.deviceSetting('virtual_switch_7').capability(['switch']).name('Virtual Switch for Relay 7');
            section.deviceSetting('virtual_switch_8').capability(['switch']).name('Virtual Switch for Relay 8');
            section.deviceSetting('virtual_switch_9').capability(['switch']).name('Virtual Switch for Relay 9');
            section.deviceSetting('virtual_switch_10').capability(['switch']).name('Virtual Switch for Relay 10');
            section.deviceSetting('virtual_switch_11').capability(['switch']).name('Virtual Switch for Relay 11');
            section.deviceSetting('virtual_switch_12').capability(['switch']).name('Virtual Switch for Relay 12');
            section.deviceSetting('virtual_switch_13').capability(['switch']).name('Virtual Switch for Relay 13');
            section.deviceSetting('virtual_switch_14').capability(['switch']).name('Virtual Switch for Relay 14');
            section.deviceSetting('virtual_switch_15').capability(['switch']).name('Virtual Switch for Relay 15');
            section.deviceSetting('virtual_switch_16').capability(['switch']).name('Virtual Switch for Relay 16');

        });


        page.section('Select the Arduino ST_Anything_Relays device', section => {
            section.deviceSetting('arduino').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

    })
