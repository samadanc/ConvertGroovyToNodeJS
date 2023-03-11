
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('These contacts...', section => {
            section.deviceSetting('contacts').capability(['contactSensor']).name('Which contact sensors?');

        });


    })

    .updated(async (context, updateData) => {

    })
