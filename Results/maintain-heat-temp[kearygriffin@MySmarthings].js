
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Choose Room Temperature... ', section => {
            section.deviceSetting('roomTemperature').capability(['temperatureMeasurement']).name('');

        });


        page.section('Choose Base Temperature... ', section => {
            section.deviceSetting('baseTemperature').capability(['temperatureMeasurement']).name('');

        });


        page.section('Switch to toggle...', section => {
            section.deviceSetting('outlet').capability(['switch']).name('');

        });


        page.section('Maximum temp...', section => {

        });


    })
