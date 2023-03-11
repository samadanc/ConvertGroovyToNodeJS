
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('LightWaveRF Login Settings', section => {
            section.textSetting('username').name('LightWaveRF Connect Username');

        });


        page.section('Server Address Settings', section => {
            section.textSetting('serverIP').name('Server IP Address');
            section.textSetting('lightwaveIP').name('Lightwave IP Address');

        });


    })
