
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Connect these virtual switches to the squeeze virtual devices', section => {
            section.deviceSetting('switch1').capability(['switch']).name('family');
            section.deviceSetting('switch2').capability(['switch']).name('master');
            section.deviceSetting('switch3').capability(['switch']).name('garage');

        });


        page.section('Which squeeze device?', section => {
            section.deviceSetting('squeeze').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

    })
