
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Which mode change triggers the simulator? (This app will only run in selected mode(s))', section => {

        });


        page.section('Light switches to turn on/off', section => {
            section.deviceSetting('switches').capability(['switch']).name('Switches');

        });


        page.section('How often to cycle the lights', section => {
            section.numberSetting('frequency_minutes').name('Minutes?');

        });


        page.section('Number of active lights at any given time', section => {
            section.numberSetting('number_of_active_lights').name('Number of active lights');

        });


        page.section('People', section => {
            section.deviceSetting('people').capability(['presenceSensor']).name('If these people are home do not change light status');

        });


        page.section('Delay to start simulator... (defaults to 2 min)', section => {

        });


        page.section('['mobileOnly': true]', section => {

        });


        page.section('['refreshAfterSelection': true], 'More options', section => {
            section.enumSetting('days').name('Only on certain days of the week');

        });


        page.section('', section => {
            section.timeSetting('starting').name('Starting (both are required)');
            section.timeSetting('ending').name('Ending (both are required)');

        });


    })

    .updated(async (context, updateData) => {

    })
