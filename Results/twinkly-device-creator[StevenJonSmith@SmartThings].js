
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Which hub shares the same network as the Twinkly device?', section => {

        });


        page.section('IP address of Twinkly device:', section => {
            section.textSetting('deviceIP').name('');

        });


        page.section('Name of Twinkly device to add:', section => {
            section.textSetting('deviceName').name('');

        });


    })
