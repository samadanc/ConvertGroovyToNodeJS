
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Notifications (optional) - NOT WORKING:', section => {
            section.enumSetting('sendPush').name('Push Notifiation');

        });


        page.section('Notification events (optional):', section => {
            section.enumSetting('notifyEvents').name('Which Events?');

        });


    })
