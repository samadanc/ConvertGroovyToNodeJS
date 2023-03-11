
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select Battery-powered devices', section => {
            section.deviceSetting('bats').capability(['battery']).name('');
            section.numberSetting('thresh').name('If the battery goes below this level, ');

        });


    })
