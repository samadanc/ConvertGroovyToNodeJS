
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Check how often (minutes)?', section => {
            section.numberSetting('frequency').name('Frequency');

        });


        page.section('Only report when UV index is above...', section => {
            section.numberSetting('reportMinimum').name('');

        });


        page.section('Only report when UV index changes by...', section => {
            section.numberSetting('delta').name('');

        });


    })
