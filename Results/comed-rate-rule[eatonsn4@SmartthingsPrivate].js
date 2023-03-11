
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Global Options:', section => {
            section.booleanSetting('activate').name('Enabled?');
            section.enumSetting('ruleType').name('Pricing Rule Type?');

        });


        page.section('Time Conditions', section => {
            section.numberSetting('time_delay').name('Number of minutes that must pass before triggering again (0 = disabled)?');
            section.timeSetting('afterTime').name('Only if time is after...');
            section.timeSetting('beforeTime').name('and before...');
            section.enumSetting('daysOfWeek').name('Select Days of the Week');

        });


        page.section('Weather Conditions', section => {
            section.numberSetting('high_is_less_than').name('Today\');
            section.numberSetting('high_is_greater_than').name('Today\');
            section.numberSetting('low_is_less_than').name('Today\');
            section.numberSetting('low_is_greater_than').name('Today\');
            section.numberSetting('humidity_is_less_than').name('Today\');
            section.numberSetting('humidity_is_greater_than').name('Today\');

        });


    })
