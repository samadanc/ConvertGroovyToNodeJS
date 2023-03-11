
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Choose thermostat... ', section => {
            section.deviceSetting('thermostat').capability(['thermostat']).name('');

        });


        page.section('Temperature Setpoint when thermostat mode is Heat and SmartThings mode is Home...', section => {

        });


        page.section('Temperature Setpoint when thermostat mode is Heat and SmartThings mode is Sleep...', section => {

        });


        page.section('Temperature Setpoint when thermostat mode is Heat and SmartThings mode is Away...', section => {

        });


        page.section('Temperature Setpoint when thermostat mode is Cooling and SmartThings mode is Home...', section => {

        });


        page.section('Temperature Setpoint when thermostat mode is Cooling and SmartThings mode is Sleep...', section => {

        });


        page.section('Temperature Setpoint when thermostat mode is Cooling and SmartThings mode is Away...', section => {

        });


        page.section('Temperature sensor in Living space 1', section => {
            section.deviceSetting('liveSpace1').capability(['temperatureMeasurement']).name('Temp Sensor');
            section.booleanSetting('liveSpace1PosOffset').name('Positive offset?');
            section.booleanSetting('liveSpace1NegOffset').name('Negative offset?');

        });


        page.section('Temperature sensor in Living space 2', section => {
            section.deviceSetting('liveSpace2').capability(['temperatureMeasurement']).name('Temp Sensor');
            section.booleanSetting('liveSpace2PosOffset').name('Positive offset?');
            section.booleanSetting('liveSpace2NegOffset').name('Negative offset?');

        });


        page.section('Temperature sensor in Bedroom 1', section => {
            section.deviceSetting('bedroom1').capability(['temperatureMeasurement']).name('Temp Sensor');
            section.booleanSetting('bedroom1PosOffset').name('Positive offset?');
            section.booleanSetting('bedroom1NegOffset').name('Negative offset?');

        });


        page.section('Temperature sensor in Bedroom 2', section => {
            section.deviceSetting('bedroom2').capability(['temperatureMeasurement']).name('Temp Sensor');
            section.booleanSetting('bedroom2PosOffset').name('Positive offset?');
            section.booleanSetting('bedroom2NegOffset').name('Negative offset?');

        });


    })
