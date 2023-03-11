
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When', section => {
            section.deviceSetting('contactSensors').capability(['contactSensor']).name('Contact is open');
            section.deviceSetting('motionSensors').capability(['motionSensor']).name('Motion is sensed');
            section.deviceSetting('cameras').capability(['imageCapture']).name('Take pictures on');
            section.numberSetting('delayTakePicture').name('After (seconds)');
            section.booleanSetting('appEnabled').name('Enabled');

        });


    })
