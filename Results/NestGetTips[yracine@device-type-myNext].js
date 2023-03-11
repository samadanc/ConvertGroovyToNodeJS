
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section(''About'', section => {

        });


        page.section('Get tips for this Nest thermostat', section => {
            section.deviceSetting('nest').capability(['thermostat']).name('MyNext Tstat only (won\');

        });


        page.section('Level Of Tip', section => {
            section.numberSetting('}').name('Which level ([0..2], 2 is the highest, 0=all tips?');
            section.booleanSetting('resetTipFlag').name('Do you want to re-start over and reset tips?');

        });


        page.section('Tip processing reset', section => {
            section.booleanSetting('resetTipFlag').name('Do you want to re-start over and reset tips?');

        });


        page.section('['mobileOnly': true]', section => {

        });


    })
