
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('This Netatmo Base Station', section => {

        });


        page.section('This Netatmo Additional Module', section => {

        });


        page.section('Noise Threshold', section => {
            section.numberSetting('noiseThreshold').name('Threshold in dB');

        });


        page.section('CO2 Threshold', section => {
            section.numberSetting('co2Threshold').name('Threshold in ppm');

        });


        page.section('This Switch', section => {
            section.deviceSetting('theSwitch').capability(['switch']).name('switch this switch');

        });


        page.section('Send Push Notification?', section => {
            section.booleanSetting('sendPush').name('Send Notifications?');

        });


    })
