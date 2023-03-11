
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Which Dual Relay', section => {
            section.deviceSetting('dualrelay').capability(['switch']).name('');

        });


        page.section('Select a virtual switch to bind to secondary relay', section => {
            section.deviceSetting('switch2').capability(['switch']).name('');

        });


    })
