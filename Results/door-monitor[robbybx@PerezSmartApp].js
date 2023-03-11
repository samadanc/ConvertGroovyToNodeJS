
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Sirens', section => {
            section.deviceSetting('sirens').capability(['alarm']).name('Which Siren?');

        });


        page.section('Virtual Switch', section => {
            section.deviceSetting('ExtContacts').capability(['contactSensor']).name('Which External Contacts?');

        });


        page.section('Virtual Switch', section => {
            section.deviceSetting('IntContacts').capability(['contactSensor']).name('Which Internal Contacts?');

        });


    })
