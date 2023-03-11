
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Devices', section => {
            section.deviceSetting('switches').capability(['switch']).name('Switches:');
            section.deviceSetting('dimmers').capability(['switchLevel']).name('Dimmers:');

        });


    })
