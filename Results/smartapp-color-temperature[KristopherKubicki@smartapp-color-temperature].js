
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Control these bulbs...', section => {
            section.deviceSetting('bulbs').capability(['colorControl']).name('Which Hue Bulbs?');

        });


        page.section('Control these Temperature Changing bulbs...', section => {
            section.deviceSetting('cbulbs').capability(['switchLevel']).name('Which Temperature Changing Bulbs?');

        });


        page.section('Color Temperature', section => {
            section.numberSetting('ct').name('Temperature (Kelvin)');

        });


        page.section('While in this mode', section => {

        });


    })
