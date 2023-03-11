
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Schedule Name', section => {
            section.textSetting('scheduleName').name('Name of this Schedule');

        });


        page.section('Set points', section => {
            section.numberSetting('coolingSetpoint').name('Cooling Setpoint');
            section.numberSetting('heatingSetpoint').name('Heating Setpoint');

        });


        page.section('Priority', section => {
            section.enumSetting('priority').name('Priority');

        });


        page.section('Apply Settings When...', section => {

        });


        page.section('On Which Days', section => {
            section.enumSetting('days').name('Select Days of the Week');

        });


        page.section('Between what times?', section => {
            section.timeSetting('fromTime').name('From');
            section.timeSetting('toTime').name('To');

        });


    })
