
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Preferences', section => {

        });


        page.section('', section => {
            section.numberSetting('numZones').name('Number of zones');

        });


        page.section('', section => {
            section.enumSetting('wateringDays').name('Water on which days?');

        });


        page.section('Minimum interval between waterings...', section => {
            section.numberSetting('days').name('Days?');

        });


        page.section('Start watering at what times...', section => {
            section.timeSetting('waterTimeOne').name('Turn them on at...');

        });


    })
