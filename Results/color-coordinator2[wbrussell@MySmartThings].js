
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Master Light', section => {
            section.deviceSetting('master').capability(['colorControl']).name('Colored Light');

        });


        page.section('Lights that follow the master settings', section => {
            section.deviceSetting('slaves').capability(['colorControl']).name('Colored Lights');

        });


        page.section('['mobileOnly': true], 'Options', section => {
            section.booleanSetting('randomYes').name('When Master Turned On, Randomize Color');

        });


    })
