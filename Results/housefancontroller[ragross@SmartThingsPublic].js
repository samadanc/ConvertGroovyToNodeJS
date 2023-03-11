
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Fan related...', section => {
            section.deviceSetting('fan').capability(['switch']).name('aeon Fan switch');
            section.deviceSetting('vsFan').capability(['switch']).name('virtual Fan Switch');

        });


        page.section('Control related...', section => {
            section.deviceSetting('contacts').capability(['contactSensor']).name('Select contact sensor(s) for fan control...');
            section.deviceSetting('thermostat').capability(['thermostat']).name('Select house thermostat');
            section.deviceSetting('externalTemp').capability(['temperatureMeasurement']).name('Select external reference temperature sensor');
            section.deviceSetting('internalTemp').capability(['temperatureMeasurement']).name('Select internal temperature sensor(s)');

        });


        page.section('Fan set points...', section => {
            section.enumSetting('fanLowTemp').name('Fan low speed setpoint degrees.');
            section.enumSetting('fanHighTemp').name('Fan high speed setpoint degrees');
            section.enumSetting('fanEnableOffset').name('Internal/external enable offset degrees');

        });


    })
