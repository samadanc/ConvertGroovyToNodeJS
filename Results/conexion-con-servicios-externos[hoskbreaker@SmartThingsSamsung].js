
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Title', section => {
            section.deviceSetting('Interruptor').capability(['switch']).name('selecciona interruptor');

        });


    })

    .updated(async (context, updateData) => {

    })
