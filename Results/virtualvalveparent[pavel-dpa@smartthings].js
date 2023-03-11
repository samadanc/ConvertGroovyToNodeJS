
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Connect these virtual switches to the Arduino\'s relays', section => {
            section.deviceSetting('valve1').capability(['valve']).name('Valve for relay 1');
            section.deviceSetting('valve2').capability(['valve']).name('Valve for relay 2');
            section.deviceSetting('valve3').capability(['valve']).name('Valve for relay 3');
            section.deviceSetting('valve4').capability(['valve']).name('Valve for relay 4');
            section.deviceSetting('valve5').capability(['valve']).name('Valve for relay 5');
            section.deviceSetting('valve6').capability(['valve']).name('Valve for relay 6');
            section.deviceSetting('valve7').capability(['valve']).name('Valve for relay 7');
            section.deviceSetting('valve8').capability(['valve']).name('Valve for relay 8');

        });


        page.section('Which Arduino relay board to control?', section => {

        });


    })

    .updated(async (context, updateData) => {

    })
