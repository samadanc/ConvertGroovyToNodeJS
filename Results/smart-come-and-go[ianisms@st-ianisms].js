
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Basics', section => {
            section.deviceSetting('presenceSensors').capability(['presenceSensor']).name('Which presence sensor(s)?');
            section.textSetting('presenceSensorNamePattern').name('Presense sensor name pattern');
            section.deviceSetting('locks').capability(['lock']).name('Which Lock(s)?');
            section.deviceSetting('doorContacts').capability(['contactSensor']).name('Which Door Contact(s)?');

        });


        page.section('Motion Control', section => {
            section.deviceSetting('motionSensors').capability(['motionSensor']).name('Which Motion Sensor(s)?');

        });


        page.section('Cameras', section => {
            section.deviceSetting('cameras').capability(['videoStream']).name('Which Cameras(s)?');

        });


        page.section('Light Control', section => {
            section.deviceSetting('switches').capability(['switch']).name('Which switch(es)?');

        });


        page.section('Greetings and Notfications', section => {
            section.deviceSetting('speechDevices').capability(['speechSynthesis']).name('Speech Device(s):');

        });


        page.section('['hideable': true], 'Debugging', section => {
            section.enumSetting('logLevel').name('Log Level:');

        });


    })
