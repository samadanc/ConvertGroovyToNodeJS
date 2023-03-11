
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section(''About'', section => {

        });


        page.section('Get tips for this ecobee thermostat', section => {

        });


        page.section('Level Of Tip', section => {
            section.numberSetting('level').name('Which level ([1..4], 4 is the highest, but not always applicable, ex. for multi-stage heating/cooling systems)?');

        });


        page.section('Tip processing reset', section => {
            section.booleanSetting('resetTipFlag').name('Do you want to re-start over and reset tips?');

        });


        page.section('['mobileOnly': true]', section => {

        });


    })
