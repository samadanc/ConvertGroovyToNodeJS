
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {
            section.deviceSetting('sirens').capability(['alarm']).name('Siren');
            section.deviceSetting('switches').capability(['switch']).name('Switch');

        });


    })
