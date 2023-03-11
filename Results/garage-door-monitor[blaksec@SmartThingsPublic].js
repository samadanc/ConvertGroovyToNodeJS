
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When the garage door is open...', section => {
            section.deviceSetting('contact1').capability(['contactSensor']).name('Which?');

        });


        page.section('For too long...', section => {
            section.numberSetting('maxOpenTime').name('Minutes?');

        });


        page.section('Text me at (optional, sends a push notification if not specified)...', section => {

        });


    })

    .updated(async (context, updateData) => {

    })
