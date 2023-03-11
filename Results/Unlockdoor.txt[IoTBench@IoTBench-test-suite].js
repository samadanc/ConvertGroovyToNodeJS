
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When I touch the app, unlock door...', section => {
            section.deviceSetting('locks').capability(['lock']).name('');

        });


    })

    .updated(async (context, updateData) => {

    })
