
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Title', section => {
            section.textSetting('host').name('JSON Server ip:port');
            section.textSetting('jsonRoot').name('JSON Root Path');

        });


        page.section('', section => {
            section.deviceSetting('buttons').capability(['button']).name('');

        });


    })
