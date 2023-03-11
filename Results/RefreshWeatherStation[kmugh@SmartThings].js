
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Choose Weather Station', section => {

        });


        page.section('Input Update Interval (minutes)', section => {
            section.numberSetting('updateInterval').name('');

        });


    })
