
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Control these hue bulbs...', section => {
            section.deviceSetting('hues').capability(['colorControl']).name('Which Hue Bulbs?');

        });


    })
