
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Router information', section => {
            section.textSetting('destIp').name('IP');
            section.numberSetting('destPort').name('Port');
            section.textSetting('path').name('Path');

        });


        page.section('Which presence sensor...', section => {
            section.deviceSetting('presence').capability(['presenceSensor']).name('');

        });


        page.section('String to detect (MAC Address, IP, etc)...', section => {
            section.textSetting('detectString').name('String');

        });


        page.section('Poll when this event is activated...', section => {
            section.deviceSetting('switches').capability(['switch']).name('');
            section.deviceSetting('motions').capability(['motionSensor']).name('');
            section.deviceSetting('contacts').capability(['contactSensor']).name('');

        });


    })
