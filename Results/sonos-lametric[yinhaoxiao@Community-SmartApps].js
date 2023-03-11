
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Choose speaker to monitor...', section => {
            section.deviceSetting('sonos').capability(['musicPlayer']).name('Which Sonos Speaker?');

        });


        page.section('Enter the Push URL from the LaMetric Developer site:', section => {
            section.textSetting('push_url').name('Push URL:');

        });


        page.section('Enter the Access Token from the LaMetric Developer site:', section => {
            section.textSetting('access_token').name('Access Token:');

        });


        page.section('Enter your icon ID number:', section => {
            section.textSetting('icon_id').name('Icon ID:');

        });


        page.section('Send text message to...', section => {

        });


    })

    .updated(async (context, updateData) => {

    })
