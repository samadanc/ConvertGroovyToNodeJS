
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select Door lock:', section => {
            section.deviceSetting('theLock').capability(['lock']).name('Door lock');

        });


        page.section('Select Contact Sensor trigger', section => {
            section.deviceSetting('theContactSensor').capability(['contactSensor']).name('Contact Sensor');
            section.enumSetting('theContactSensorState').name('Contact Sensor State');
            section.numberSetting('theContactDelay').name('Delay (Minutes)');

        });


    })
