
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Connection Details', section => {
            section.textSetting('serverIP').name('Server IP Address');
            section.numberSetting('serverPort').name('Server Port Number');

        });


    })
