
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('SmartThings Hub', section => {

        });


        page.section('MusicCast Receiver', section => {
            section.textSetting('receiverName').name('Name');
            section.textSetting('receiverIp').name('IP');
            section.enumSetting('receiverZones').name('Zones');

        });


    })
