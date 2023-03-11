
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {
            section.numberSetting('interval').name('Set refresh minutes');
            section.booleanSetting('skipFirmware').name('Skip firmware check');

        });


    })
