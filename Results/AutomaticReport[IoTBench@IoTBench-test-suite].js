
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section(''About'', section => {

        });


        page.section('Generate daily report for this Automatic Connected Vehicle', section => {
            section.deviceSetting('automatic').capability(['presenceSensor']).name('Automatic?');

        });


        page.section('Start date for the report, format = YYYY-MM-DD', section => {
            section.textSetting('givenStartDate').name('Beginning Date [default=yesterday]');

        });


        page.section('Start time for report HH:MM (24HR)', section => {
            section.textSetting('givenStartTime').name('Beginning time [default=00:00]');

        });


        page.section('End date for the report = YYYY-MM-DD', section => {
            section.textSetting('givenEndDate').name('End Date [default=today]');

        });


        page.section('End time for the report (24HR)', section => {
            section.textSetting('givenEndTime').name('End time [default=00:00]');

        });


        page.section('Notifications', section => {
            section.enumSetting('sendPushMessage').name('Send a push notification?');

        });


    })

    .updated(async (context, updateData) => {

    })
