
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section(''About'', section => {

        });


        page.section('For the Ecobee thermostat(s)', section => {
            section.deviceSetting('ecobee').capability(['thermostat']).name('Ecobee Thermostat');

        });


        page.section('Create this Vacation Name', section => {
            section.textSetting('vacationName').name('Vacation Name');

        });


        page.section('Or delete the vacation [default=false]', section => {

        });


        page.section('Cool Temp for vacation, [default = 80°F/27°C]', section => {

        });


        page.section('Heat Temp for vacation [default= 60°F/14°C]', section => {

        });


        page.section('Start date for the vacation, [format = DD-MM-YYYY]', section => {
            section.textSetting('givenStartDate').name('Beginning Date');

        });


        page.section('Start time for the vacation [HH:MM 24HR]', section => {
            section.textSetting('givenStartTime').name('Beginning time');

        });


        page.section('End date for the vacation [format = DD-MM-YYYY]', section => {
            section.textSetting('givenEndDate').name('End Date');

        });


        page.section('End time for the vacation [HH:MM 24HR]', section => {
            section.textSetting('givenEndTime').name('End time');

        });


        page.section('Notifications', section => {
            section.enumSetting('sendPushMessage').name('Send a push notification?');

        });


    })

    .updated(async (context, updateData) => {

    })
