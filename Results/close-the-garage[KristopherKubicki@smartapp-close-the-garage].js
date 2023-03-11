
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Close the garage door if there\'s no motion...', section => {
            section.deviceSetting('motions').capability(['motionSensor']).name('Where?');

        });


        page.section('After how many minutes...', section => {
            section.numberSetting('minutes').name('Minutes?');

        });


        page.section('Close this door...', section => {
            section.deviceSetting('doors').capability(['doorControl']).name('');

        });


    })
