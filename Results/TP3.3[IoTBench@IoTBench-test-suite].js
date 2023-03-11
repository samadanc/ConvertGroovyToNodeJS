
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Choose a switch to use...', section => {
            section.deviceSetting('controlSwitch').capability(['switch']).name('Switch');

        });


        page.section('Change to which mode when...', section => {

        });


        page.section('['mobileOnly': true], 'Options'', section => {

        });


        page.section('', section => {

        });


        page.section(''Instructions'', section => {

        });


    })
