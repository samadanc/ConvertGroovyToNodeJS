
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Control with switch...', section => {
            section.deviceSetting('mySwitch').capability(['switch']).name('Switch?');

        });


        page.section('Control these bulbs...', section => {
            section.deviceSetting('bulb').capability(['switchLevel']).name('Which Bulbs?');

        });


        page.section('['mobileOnly': true]', section => {

        });


        page.section('Options...', section => {
            section.numberSetting('levelSec').name('Seconds between change?');

        });


        page.section('Options...', section => {
            section.numberSetting('levelStep').name('Number of level steps per interval?');

        });


    })
