
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {

        });


        page.section(''Instructions'', section => {

        });


        page.section('', section => {
            section.timeSetting('timeStart').name('Starting');
            section.timeSetting('timeEnd').name('Ending');

        });


    })
