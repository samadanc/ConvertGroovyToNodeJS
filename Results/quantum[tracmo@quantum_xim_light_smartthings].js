
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Allow these things to be exposed via JSON...', section => {
            section.deviceSetting('switches').capability(['colorControl']).name('Switches');
            section.deviceSetting('outlets').capability(['outlet']).name('Outlets');

        });


    })
