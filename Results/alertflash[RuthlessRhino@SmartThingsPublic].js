
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When I touch the app, flash these...', section => {
            section.deviceSetting('switches').capability(['switch']).name('');

        });


        page.section('Flash this way...', section => {
            section.enumSetting('type').name('Type?');

        });


    })

    .updated(async (context, updateData) => {

    })
