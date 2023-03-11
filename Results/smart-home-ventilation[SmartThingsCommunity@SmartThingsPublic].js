
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {
            section.timeSetting('timeOnA1').name('Schedule 1 time to turn on');
            section.timeSetting('timeOffA1').name('Schedule 1 time to turn off');

        });


        page.section('', section => {
            section.timeSetting('timeOnA2').name('Schedule 2 time to turn on');
            section.timeSetting('timeOffA2').name('Schedule 2 time to turn off');

        });


        page.section('', section => {
            section.timeSetting('timeOnA3').name('Schedule 3 time to turn on');
            section.timeSetting('timeOffA3').name('Schedule 3 time to turn off');

        });


        page.section('', section => {
            section.timeSetting('timeOnA4').name('Schedule 4 time to turn on');
            section.timeSetting('timeOffA4').name('Schedule 4 time to turn off');

        });


        page.section('Options', section => {
            section.textSetting('titleA').name('Assign a scenario name');
            section.enumSetting('daysA').name('Run on specific day(s)');

        });


        page.section('', section => {
            section.timeSetting('timeOnB1').name('Schedule 1 time to turn on');
            section.timeSetting('timeOffB1').name('Schedule 1 time to turn off');

        });


        page.section('', section => {
            section.timeSetting('timeOnB2').name('Schedule 2 time to turn on');
            section.timeSetting('timeOffB2').name('Schedule 2 time to turn off');

        });


        page.section('', section => {
            section.timeSetting('timeOnB3').name('Schedule 3 time to turn on');
            section.timeSetting('timeOffB3').name('Schedule 3 time to turn off');

        });


        page.section('', section => {
            section.timeSetting('timeOnB4').name('Schedule 4 time to turn on');
            section.timeSetting('timeOffB4').name('Schedule 4 time to turn off');

        });


        page.section('Options', section => {
            section.textSetting('titleB').name('Assign a scenario name');
            section.enumSetting('daysB').name('Run on specific day(s)');

        });


        page.section('', section => {
            section.timeSetting('timeOnC1').name('Schedule 1 time to turn on');
            section.timeSetting('timeOffC1').name('Schedule 1 time to turn off');

        });


        page.section('', section => {
            section.timeSetting('timeOnC2').name('Schedule 2 time to turn on');
            section.timeSetting('timeOffC2').name('Schedule 2 time to turn off');

        });


        page.section('', section => {
            section.timeSetting('timeOnC3').name('Schedule 3 time to turn on');
            section.timeSetting('timeOffC3').name('Schedule 3 time to turn off');

        });


        page.section('', section => {
            section.timeSetting('timeOnC4').name('Schedule 4 time to turn on');
            section.timeSetting('timeOffC4').name('Schedule 4 time to turn off');

        });


        page.section('Options', section => {
            section.textSetting('titleC').name('Assign a scenario name');
            section.enumSetting('daysC').name('Run on specific day(s)');

        });


        page.section('', section => {
            section.timeSetting('timeOnD1').name('Schedule 1 time to turn on');
            section.timeSetting('timeOffD1').name('Schedule 1 time to turn off');

        });


        page.section('', section => {
            section.timeSetting('timeOnD2').name('Schedule 2 time to turn on');
            section.timeSetting('timeOffD2').name('Schedule 2 time to turn off');

        });


        page.section('', section => {
            section.timeSetting('timeOnD3').name('Schedule 3 time to turn on');
            section.timeSetting('timeOffD3').name('Schedule 3 time to turn off');

        });


        page.section('', section => {
            section.timeSetting('timeOnD4').name('Schedule 4 time to turn on');
            section.timeSetting('timeOffD4').name('Schedule 4 time to turn off');

        });


        page.section('Options', section => {
            section.textSetting('titleD').name('Assign a scenario name');
            section.enumSetting('daysD').name('Run on specific day(s)');

        });


        page.section('', section => {

        });


        page.section(''Instructions'', section => {

        });


    })
