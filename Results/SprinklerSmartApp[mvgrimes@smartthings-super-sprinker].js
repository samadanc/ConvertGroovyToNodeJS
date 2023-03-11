
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section(''App configruation...'', section => {

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


        page.section('Water every...', section => {
            section.numberSetting('days').name('Days?');

        });


        page.section('Sprinkler switch...', section => {
            section.deviceSetting('switches').capability(['switch']).name('');

        });


        page.section('Sprinkler zones...', section => {
            section.numberSetting('theZoneCount').name('Zones?');

        });


        page.section('Zip code to check weather...', section => {
            section.textSetting('zipcode').name('Zipcode?');

        });


        page.section('Select which rain to add to guage...', section => {

        });


        page.section('Skip watering if more than... (default 0.5)', section => {

        });


    })
