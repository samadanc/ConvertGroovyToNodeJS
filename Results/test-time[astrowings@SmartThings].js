
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When this switch is turned on', section => {
            section.deviceSetting('theswitch').capability(['switch']).name('');

        });


        page.section('Time input', section => {
            section.timeSetting('timeString').name('');

        });


    })

    .updated(async (context, updateData) => {

    })
