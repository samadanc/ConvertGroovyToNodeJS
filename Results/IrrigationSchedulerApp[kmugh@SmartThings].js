
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section(''App configuration...'', section => {

        });


        page.section('', section => {
            section.enumSetting('wateringDays').name('Water which days?');

        });


        page.section('Water every...', section => {
            section.numberSetting('days').name('Days?');

        });


        page.section('Water when...', section => {
            section.timeSetting('waterTimeOne').name('Turn them on at...');
            section.timeSetting('waterTimeTwo').name('and again at...');
            section.timeSetting('waterTimeThree').name('and again at...');

        });


        page.section('Sprinkler switches...', section => {
            section.deviceSetting('switches').capability(['switch']).name('');

        });


        page.section('Zone Times...', section => {

        });


        page.section('Zip code to check weather...', section => {
            section.textSetting('zipcode').name('Zipcode?');

        });


        page.section('Skip watering if more than... (default 0.5)', section => {

        });


        page.section('Optional: Use this virtual scheduler device...', section => {
            section.deviceSetting('schedulerVirtualDevice').capability(['actuator']).name('');

        });


    })

    .updated(async (context, updateData) => {

    })
