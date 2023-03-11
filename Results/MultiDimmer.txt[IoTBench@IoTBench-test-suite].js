
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Configure', section => {
            section.deviceSetting('dimmer').capability(['switchLevel']).name('Which dimmer switch?');
            section.deviceSetting('bulbs').capability(['switchLevel']).name('Which lights to set?');

        });


    })
