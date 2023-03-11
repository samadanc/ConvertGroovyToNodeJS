
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When this master switch is turned on or off...', section => {
            section.deviceSetting('master').capability(['switch']).name('Which Switch?');

        });


        page.section('Turn on or off all of these switches as well', section => {
            section.deviceSetting('switches').capability(['switch']).name('');

        });


        page.section('Turn off but not on all of these switches', section => {
            section.deviceSetting('offSwitches').capability(['switch']).name('');

        });


        page.section('And turn on but not off all of these switches', section => {
            section.deviceSetting('onSwitches').capability(['switch']).name('');

        });


    })
