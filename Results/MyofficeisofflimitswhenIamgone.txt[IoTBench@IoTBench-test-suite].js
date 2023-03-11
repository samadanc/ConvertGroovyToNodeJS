
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Monitor this door', section => {
            section.deviceSetting('door').capability(['contactSensor']).name('');

        });


        page.section('When this person is away', section => {
            section.deviceSetting('person').capability(['presenceSensor']).name('');

        });


    })

    .updated(async (context, updateData) => {

    })
