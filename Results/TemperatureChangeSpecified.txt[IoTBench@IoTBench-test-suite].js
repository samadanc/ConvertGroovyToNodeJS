
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select a temperature sensor', section => {
            section.deviceSetting('sensor').capability(['temperatureMeasurement']).name('Sensor');

        });


        page.section('Set the LOW temperature', section => {

        });


        page.section('Set the HIGH temperature', section => {

        });


        page.section('Text me at (optional)', section => {

        });


    })
