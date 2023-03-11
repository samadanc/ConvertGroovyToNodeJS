
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When Someone Knocks?', section => {
            section.deviceSetting('knockSensor').capability(['accelerationSensor']).name('Where?');

        });


        page.section('But not when they open this door?', section => {
            section.deviceSetting('openSensor').capability(['contactSensor']).name('Where?');

        });


        page.section('Knock Delay (defaults to 5s)?', section => {
            section.numberSetting('knockDelay').name('How Long?');

        });


        page.section('Notifications', section => {
            section.enumSetting('sendPushMessage').name('Send a push notification?');

        });


        page.section('Control these bulbs...', section => {
            section.deviceSetting('hues').capability(['colorControl']).name('Which Hue Bulbs?');

        });


        page.section('Choose light effects...', section => {
            section.enumSetting('color').name('Hue Color?');
            section.enumSetting('lightLevel').name('Light Level?');
            section.numberSetting('duration').name('Duration Seconds (Defaults to 10s)?');

        });


        page.section('Minimum time between messages (optional, defaults to every message)', section => {

        });


        page.section('Speaker to Play Sound', section => {
            section.deviceSetting('sonos').capability(['musicPlayer']).name('Sonos Device');
            section.numberSetting('volume').name('Temporarily change volume');

        });


        page.section('What message to you want to say?', section => {
            section.textSetting('textHere').name('Type in the message');

        });


    })
