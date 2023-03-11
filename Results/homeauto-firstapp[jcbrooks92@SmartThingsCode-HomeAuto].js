
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Allow what services users have access to', section => {
            section.deviceSetting('switches').capability(['switch']).name('');

        });


    })
