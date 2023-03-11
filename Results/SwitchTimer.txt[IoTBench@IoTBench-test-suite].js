
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Turn on a switch...', section => {
            section.deviceSetting('switch1').capability(['switch']).name('');

        });


        page.section('For some minutes...', section => {

        });


    })

    .updated(async (context, updateData) => {

    })
