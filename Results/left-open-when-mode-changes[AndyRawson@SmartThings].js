
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('What to monitor', section => {
            section.deviceSetting('contacts').capability(['contactSensor']).name('Contacts to monitor');

        });


        page.section('Send Notifications to', section => {

        });


    })

    .updated(async (context, updateData) => {

    })
