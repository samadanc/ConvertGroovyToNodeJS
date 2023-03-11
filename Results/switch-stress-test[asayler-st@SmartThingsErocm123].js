
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Run stress test on these switches', section => {
            section.deviceSetting('switches').capability(['switch']).name('');

        });


        page.section('Frequency', section => {
            section.enumSetting('checkFrequency').name('Run at this interval');

        });


        page.section(''Status'', section => {

        });


        page.section('Additional Options', section => {
            section.booleanSetting('reset').name('Reset SmartApp counters');

        });


    })
