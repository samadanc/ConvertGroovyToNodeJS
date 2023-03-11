
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Use this Alarm...', section => {
            section.deviceSetting('alarmsystem').capability(['alarm']).name('');

        });


        page.section('Set alarm to \'Off\' when mode matches', section => {

        });


        page.section('Set alarm to \'Away\' when mode matches', section => {

        });


        page.section('Set alarm to \'Home\' when mode matches', section => {

        });


        page.section('Notifications', section => {
            section.enumSetting('sendPushMessage').name('Send a push notification?');

        });


        page.section('['mobileOnly': true]', section => {

        });


    })
