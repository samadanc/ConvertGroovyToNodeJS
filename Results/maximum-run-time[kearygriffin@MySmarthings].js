
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When the following is turned on...', section => {
            section.deviceSetting('switch1').capability(['switch']).name('Which Switch?');

        });


        page.section('Turn it off after...', section => {
            section.numberSetting('seconds').name('Seconds');

        });


    })
