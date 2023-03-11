
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Connect these virtual switches to the Arduino\'s relays', section => {
            section.deviceSetting('switch1').capability(['switch']).name('Switch for relay 1');
            section.deviceSetting('switch2').capability(['switch']).name('Switch for relay 2');
            section.deviceSetting('switch3').capability(['switch']).name('Switch for relay 3');
            section.deviceSetting('switch4').capability(['switch']).name('Switch for relay 4');
            section.deviceSetting('switch5').capability(['switch']).name('Switch for relay 5');
            section.deviceSetting('switch6').capability(['switch']).name('Switch for relay 6');
            section.deviceSetting('switch7').capability(['switch']).name('Switch for relay 7');
            section.deviceSetting('switch8').capability(['switch']).name('Switch for relay 8');
            section.deviceSetting('ledgreen').capability(['switch']).name('Switch for ledgreen');
            section.deviceSetting('ledyellow').capability(['switch']).name('Switch for ledyellow');

        });


        page.section('Which Arduino relay board to control?', section => {
            section.deviceSetting('arduino').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

    })
