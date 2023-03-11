
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section(''About'', section => {

        });


        page.section('For this Ecobee thermostat', section => {

        });


        page.section('Control this SmartPlug Name', section => {
            section.textSetting('plugName').name('SmartPlug Name');

        });


        page.section('Target control State', section => {
            section.enumSetting('plugState').name('Control State?');

        });


        page.section('Hold Type', section => {
            section.enumSetting('givenHoldType').name('Hold Type?');

        });


        page.section('For \'dateTime\' holdType, Start date for the hold (format = DD-MM-YYYY)', section => {
            section.textSetting('givenStartDate').name('Beginning Date');

        });


        page.section('For \'dateTime\' holdType, Start time for the hold (HH:MM,24HR)', section => {
            section.textSetting('givenStartTime').name('Beginning time');

        });


        page.section('For \'dateTime\' holdType, End date for the hold (format = DD-MM-YYYY)', section => {
            section.textSetting('givenEndDate').name('End Date');

        });


        page.section('For \'dateTime\' holdType, End time for the hold (HH:MM,24HR)', section => {
            section.textSetting('givenEndTime').name('End time');

        });


    })

    .updated(async (context, updateData) => {

    })
