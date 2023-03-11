
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Alarm Panel:', section => {
            section.deviceSetting('paneldevices').capability(['polling']).name('Alarm Panel (required)');

        });


        page.section('Zone Devices:', section => {
            section.deviceSetting('zonedevices').capability(['polling']).name('DSC Zone Devices (required)');

        });


        page.section('Notifications (optional)', section => {
            section.enumSetting('sendPush').name('Push Notifiation');

        });


        page.section('Notification events (optional):', section => {
            section.enumSetting('notifyEvents').name('Which Events?');

        });


    })
