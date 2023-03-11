
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select the HubDuino Bridge Device', section => {
            section.deviceSetting('HubDuino').capability(['sensor']).name('');

        });


    })

    .updated(async (context, updateData) => {

    })
