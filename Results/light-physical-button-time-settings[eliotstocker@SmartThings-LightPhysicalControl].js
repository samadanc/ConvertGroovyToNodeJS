
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Time Range', section => {
            section.timeSetting('start').name('Start Time');
            section.timeSetting('end').name('End Time');

        });


        page.section('Select Lights Settings when turned on within selected time range', section => {
            section.numberSetting('level').name('Light Brightness');
            section.numberSetting('temp').name('Light Color Temperature');
            section.enumSetting('color').name('Color');

        });


        page.section(''Advanced: Per Light Settings'', section => {

        });


        page.section('', section => {

        });


    })
