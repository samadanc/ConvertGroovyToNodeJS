
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Zip Code', section => {
            section.textSetting('checkZip').name('Enter zip code to check, or leave blank to use hub location.');

        });


        page.section('Forecast Options', section => {
            section.enumSetting('forecastType').name('Forecast range');
            section.enumSetting('checkRain').name('Check for rain?');
            section.enumSetting('pollenCat').name('Alert on this pollen index category or worse');
            section.textSetting('pollenKeywords').name('Alert on these pollen types only (enter keywords to check seperated by commas. e.g. rye grass, ragweed)');
            section.enumSetting('checkAir').name('Check air quality? (Requires API key to be set in IDE)');
            section.enumSetting('airNowCat').name('Alert on this air quality or worse');

        });


        page.section('Things to check', section => {
            section.deviceSetting('sensors').capability(['contactSensor']).name('Check if these contacts are open');

        });


        page.section('Notifications', section => {
            section.enumSetting('sendPushMessage').name('Send a push notification');

        });


        page.section('['hideWhenEmpty': true], 'Audio alerts', section => {
            section.deviceSetting('sonos').capability(['musicPlayer']).name('Play on this Music Player');
            section.numberSetting('sonosVolume').name('Temporarily change volume');
            section.booleanSetting('resumePlaying').name('Resume currently playing music after notification');

        });


        page.section('Message options', section => {
            section.numberSetting('messageDelay').name('Delay before sending initial message? Minutes (default to no delay)');
            section.numberSetting('messageReset').name('Delay before sending secondary messages? Minutes (default to every message)');
            section.enumSetting('messageRainChance').name('Include chance of rain in message?');

        });


    })
