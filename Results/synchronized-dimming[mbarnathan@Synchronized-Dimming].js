
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select devices to dim together:', section => {
            section.deviceSetting('dimmers').capability(['switchLevel']).name('Dimmers');

        });


    })
