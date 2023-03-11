
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('''', section => {

        });


        page.section('['hideable': true, 'hidden': true], 'Options', section => {
            section.numberSetting('refreshMRInterval').name('Enter refresh players interval (min)');

        });


    })
