
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Text alerts to...', section => {

        });


        page.section('Activate alarms...', section => {
            section.deviceSetting('alarms').capability(['alarm']).name('Alarms');
            section.enumSetting('silent').name('Silent alarm only (Yes/No), i.e. strobe');
            section.numberSetting('clear').name('Active (seconds)');

        });


        page.section('Options...', section => {
            section.textSetting('zipcode').name('Zip Code');
            section.textSetting('filters').name('Filter Alerts (x,x,...)');
            section.booleanSetting('skipfilters').name('Still text (skip filters)?');

        });


    })
