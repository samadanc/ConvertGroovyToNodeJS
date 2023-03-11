
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section(''About'', section => {

        });


        page.section('For this ecobee thermostat', section => {

        });


        page.section('Create (if not present) or update this climate', section => {
            section.textSetting('climateName').name('Climate Name');

        });


        page.section('Or delete the Climate [default=false]', section => {

        });


        page.section('Substitute Climate name in schedule (used for delete)', section => {
            section.textSetting('subClimateName').name('Climate Name');

        });


        page.section('Cool Temp [default = 75°F/23°C]', section => {

        });


        page.section('Heat Temp [default=72°F/21°C]', section => {

        });


        page.section('isOptimized [default=false]', section => {

        });


        page.section('isOccupied [default=false]', section => {

        });


        page.section('Cool Fan Mode [default=auto]', section => {
            section.enumSetting('givenCoolFanMode').name('Cool Fan Mode ?');

        });


        page.section('Heat Fan Mode [default=auto]', section => {
            section.enumSetting('givenHeatFanMode').name('Heat Fan Mode ?');

        });


        page.section('Notifications', section => {
            section.enumSetting('sendPushMessage').name('Send a push notification?');

        });


    })

    .updated(async (context, updateData) => {

    })
