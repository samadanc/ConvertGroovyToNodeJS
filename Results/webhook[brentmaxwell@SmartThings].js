
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Webhook URL', section => {
            section.textSetting('url').name('Webhook URL');

        });


        page.section('Choose what events you want to trigger', section => {
            section.deviceSetting('${cap.value.id}Pref').capability(['${cap.value.id}']).name('${cap.value.name}');

        });


    })

    .updated(async (context, updateData) => {

    })
