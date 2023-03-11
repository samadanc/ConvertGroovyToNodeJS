
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Pick Camera to Turn on/off', section => {
            section.deviceSetting('camera').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

    })
