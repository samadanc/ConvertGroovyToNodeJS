
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {
            section.timeSetting('A_timeStart').name('Starting');
            section.timeSetting('A_timeEnd').name('Ending');

        });


        page.section('', section => {
            section.timeSetting('B_timeStart').name('Starting');
            section.timeSetting('B_timeEnd').name('Ending');

        });


        page.section('', section => {
            section.timeSetting('C_timeStart').name('Starting');
            section.timeSetting('C_timeEnd').name('Ending');

        });


        page.section('', section => {
            section.timeSetting('D_timeStart').name('Starting');
            section.timeSetting('D_timeEnd').name('Ending');

        });


        page.section('', section => {
            section.timeSetting('E_timeStart').name('Starting');
            section.timeSetting('E_timeEnd').name('Ending');

        });


        page.section('', section => {

        });


        page.section(''Instructions'', section => {

        });


    })
