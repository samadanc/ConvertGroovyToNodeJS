
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Preferences', section => {

        });


        page.section('', section => {
            section.enumSetting('wateringDays').name('Water on which days?');

        });


        page.section('Minimum interval between waterings...', section => {
            section.numberSetting('days').name('Days?');

        });


        page.section('Start watering at what times...', section => {
            section.timeSetting('waterTimeOne').name('Turn them on at...');
            section.timeSetting('waterTimeTwo').name('and again at...');
            section.timeSetting('waterTimeThree').name('and again at...');

        });


        page.section('Select your sprinkler controller...', section => {
            section.deviceSetting('switches').capability(['switch']).name('');

        });


        page.section('Zone Times...', section => {

        });


        page.section('Zip code or Weather Station ID to check weather...', section => {
            section.textSetting('zipcode').name('Enter zipcode or or pws:stationid');

        });


        page.section('Select which rain to add to your virtual rain guage...', section => {

        });


        page.section('Skip watering if virutal rain guage totals more than... (default 0.5)', section => {

        });


        page.section('Run watering only if forecasted high temp (F) is greater than... (default 50)', section => {

        });


    })
