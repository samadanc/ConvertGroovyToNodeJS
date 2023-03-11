
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Switch Linkage', section => {
            section.deviceSetting('realswitch').capability(['switch']).name('Switch To Mirror From...');
            section.deviceSetting('mirrorswitches').capability(['switch']).name('Switch(es) To Mirror To...');

        });


    })
