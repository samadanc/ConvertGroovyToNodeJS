
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Connect these virtual switches to the TV Positions', section => {
            section.deviceSetting('switch1').capability(['switch']).name('High');
            section.deviceSetting('switch2').capability(['switch']).name('Mid');
            section.deviceSetting('switch3').capability(['switch']).name('Low');

        });


        page.section('Which TV board?', section => {
            section.deviceSetting('arduino').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

    })
