
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Turn on with which switch?', section => {
            section.deviceSetting('wallSwitch').capability(['switch']).name('');

        });


        page.section('Turns on which outlets?', section => {
            section.deviceSetting('outlets').capability(['switch']).name('');

        });


        page.section('Use switch for additional toggling (on if already on, off if already off)?', section => {
            section.enumSetting('toggle').name('');

        });


    })
