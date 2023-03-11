
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Sensors that should go to PI', section => {
            section.deviceSetting('batteries').capability(['battery']).name('Batteries');
            section.deviceSetting('motions').capability(['motionSensor']).name('Motion Sensors');
            section.deviceSetting('presences').capability(['presenceSensor']).name('Presence Sensors');
            section.deviceSetting('switches').capability(['switch']).name('Switches');
            section.deviceSetting('switchLevels').capability(['switchLevel']).name('Switch Levels');
            section.deviceSetting('temperatures').capability(['temperatureMeasurement']).name('Temperatures');
            section.deviceSetting('waterSensors').capability(['waterSensor']).name('Water Sensors');

        });


        page.section('PI OMF Details', section => {
            section.textSetting('omfendpoint').name('PI Web API OMF Endpoint (https://piwebapiserver/piwebapi/omf)');
            section.textSetting('basicauth').name('base64 encoded username password');
            section.textSetting('typeprefix').name('Prefix for OMF type (include delimiter)');
            section.textSetting('streamprefix').name('Prefix for OMF container (include delimiter)');

        });


    })
