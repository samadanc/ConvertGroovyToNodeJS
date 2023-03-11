
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When motion is detected...', section => {
            section.deviceSetting('motions').capability(['motionSensor']).name('Where?');

        });


        page.section('And the doors are shut...', section => {
            section.deviceSetting('contacts').capability(['contactSensor']).name('Which door?');

        });


        page.section('And the lights are off...', section => {
            section.deviceSetting('lights').capability(['light']).name('Which light?');

        });


        page.section('Notification', section => {
            section.textSetting('message').name('Notification text');

        });


    })
