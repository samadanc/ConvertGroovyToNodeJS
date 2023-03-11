
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When these sensor are activated...', section => {
            section.deviceSetting('contactSensor').capability(['contactSensor']).name('Contact Sensor');
            section.deviceSetting('knockSensor').capability(['accelerationSensor']).name('Movement Sensor');

        });


        page.section('Turn this on...', section => {
            section.deviceSetting('switchDevice').capability(['switch']).name('Switch?');
            section.booleanSetting('turnOff').name('Turn off when Closed?');
            section.numberSetting('allowance').name('Leave on for Minutes? (0 Forever)');

        });


    })
