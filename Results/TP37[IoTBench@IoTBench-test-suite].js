
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When one of these people arrive at home', section => {
            section.deviceSetting('people').capability(['presenceSensor']).name('Who?');

        });


        page.section('When the mode changes opens...', section => {
            section.deviceSetting('contact1').capability(['contactSensor']).name('Where?');

        });


        page.section('', section => {
            section.deviceSetting('sonos').capability(['musicPlayer']).name('Sonos Device');

        });


    })

    .updated(async (context, updateData) => {

    })
