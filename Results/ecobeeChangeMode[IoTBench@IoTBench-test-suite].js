
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section(''About'', section => {

        });


        page.section('Change the following ecobee thermostat(s)...', section => {

        });


        page.section('Do the mode change manually only (by pressing the arrow to execute the smartapp)', section => {
            section.booleanSetting('manualFlag').name('Manual only [default=false]');

        });


        page.section('Notifications', section => {
            section.enumSetting('sendPushMessage').name('Send a push notification?');

        });


        page.section('['mobileOnly': true]', section => {

        });


    })
