
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Use these presence tags...', section => {
            section.deviceSetting('presence').capability(['tone']).name('');

        });


    })

    .updated(async (context, updateData) => {

    })
