
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Notifications', section => {
            section.enumSetting('pushAndPhone').name('Both Push and SMS?');

        });


    })

    .updated(async (context, updateData) => {

    })
