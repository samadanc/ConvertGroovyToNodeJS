
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Choose a temperature sensor... ', section => {
            section.deviceSetting('sensor').capability(['temperatureMeasurement']).name('Sensor');

        });


        page.section('Person(s) who typically occupies this room', section => {
            section.deviceSetting('roomOwners').capability(['presenceSensor']).name('');

        });


        page.section('Select the heater or air conditioner outlet(s)... ', section => {
            section.deviceSetting('outlets').capability(['switch']).name('Outlets');

        });


        page.section('Mode #1 temperature', section => {

        });


        page.section('Set the desired temperature in mode #1...', section => {

        });


        page.section('Mode #2 temperature', section => {

        });


        page.section('Set the desired temperature in mode #2...', section => {

        });


        page.section('Never go below this value in any mode...', section => {

        });


    })
