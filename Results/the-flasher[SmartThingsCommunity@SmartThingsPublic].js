
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When any of the following devices trigger...', section => {
            section.deviceSetting('motion').capability(['motionSensor']).name('Motion Sensor?');
            section.deviceSetting('contact').capability(['contactSensor']).name('Contact Sensor?');
            section.deviceSetting('acceleration').capability(['accelerationSensor']).name('Acceleration Sensor?');
            section.deviceSetting('mySwitch').capability(['switch']).name('Switch?');
            section.deviceSetting('myPresence').capability(['presenceSensor']).name('Presence Sensor?');

        });


        page.section('Then flash...', section => {
            section.deviceSetting('switches').capability(['switch']).name('These lights');
            section.numberSetting('numFlashes').name('This number of times (default 3)');

        });


        page.section('Time settings in milliseconds (optional)...', section => {
            section.numberSetting('onFor').name('On for (default 1000)');
            section.numberSetting('offFor').name('Off for (default 1000)');

        });


    })

    .updated(async (context, updateData) => {

    })
