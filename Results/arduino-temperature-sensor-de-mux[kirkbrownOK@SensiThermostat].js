
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Arduino Input Dev1: ', section => {
            section.deviceSetting('inDev1').capability(['temperatureMeasurement']).name('');

        });


        page.section('Temperature output Dev1', section => {
            section.deviceSetting('outDev1').capability(['temperatureMeasurement']).name('');

        });


        page.section('Thermostat out for Dev1', section => {
            section.deviceSetting('thermDev1').capability(['temperatureMeasurement']).name('');

        });


        page.section('Arduino Input Dev2: ', section => {
            section.deviceSetting('inDev2').capability(['temperatureMeasurement']).name('');

        });


        page.section('Temperature output Dev2', section => {
            section.deviceSetting('outDev2').capability(['temperatureMeasurement']).name('');

        });


        page.section('Arduino Input Dev3: ', section => {
            section.deviceSetting('inDev3').capability(['temperatureMeasurement']).name('');

        });


        page.section('Temperature output Dev3', section => {
            section.deviceSetting('outDev3').capability(['temperatureMeasurement']).name('');

        });


    })
