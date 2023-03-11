
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Control this Fibaro Dimmer 2', section => {
            section.deviceSetting('fibaroDimmer2Devices').capability(['switch']).name('');

        });


        page.section('Starting', section => {
            section.numberSetting('sunsetOffset').name('Minutes after sunset');
            section.timeSetting('startTime').name('or from this time');

        });


        page.section('Ending', section => {
            section.numberSetting('sunriseOffset').name('Minutes after sunrise');
            section.timeSetting('endTime').name('or till this time');

        });


        page.section('Set night mode brightness level', section => {
            section.numberSetting('reducedBrightness').name('Brightness level');

        });


    })
