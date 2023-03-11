
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When this door closes...', section => {
            section.deviceSetting('contact').capability(['contactSensor']).name('Door Contact');

        });


        page.section('Lock these locks...', section => {
            section.deviceSetting('locks').capability(['lock']).name('Locks...');

        });


    })
