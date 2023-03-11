
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section(''About'', section => {

        });


        page.section('For this ecobee thermostat', section => {

        });


        page.section('Create this group or update all groups [empty for all group]', section => {
            section.textSetting('groupName').name('Group Name');

        });


        page.section('Or delete the group [default=false]', section => {

        });


        page.section('Synchronize Vacation', section => {

        });


        page.section('Synchronize Schedule', section => {

        });


        page.section('Synchronize SystemMode', section => {

        });


        page.section('Synchronize Alerts', section => {

        });


        page.section('Synchronize QuickSave', section => {

        });


        page.section('Synchronize User Preferences', section => {

        });


        page.section('Notifications', section => {
            section.enumSetting('sendPushMessage').name('Send a push notification?');

        });


    })

    .updated(async (context, updateData) => {

    })
