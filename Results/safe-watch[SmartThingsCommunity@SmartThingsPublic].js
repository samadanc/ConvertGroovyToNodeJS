
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Things to secure?', section => {
            section.deviceSetting('contact').capability(['contactSensor']).name('Contact Sensor');
            section.deviceSetting('motion').capability(['motionSensor']).name('Motion Sensor');
            section.deviceSetting('knock').capability(['accelerationSensor']).name('Knock Sensor');
            section.deviceSetting('axis').capability(['threeAxis']).name('Three-Axis Sensor');

        });


        page.section('Temperature monitor?', section => {
            section.deviceSetting('temp').capability(['temperatureMeasurement']).name('Temperature Sensor');
            section.numberSetting('maxTemp').name('Max Temperature (°${location.temperatureScale})');
            section.numberSetting('minTemp').name('Min Temperature (°${location.temperatureScale})');

        });


        page.section('When which people are away?', section => {
            section.deviceSetting('people').capability(['presenceSensor']).name('');

        });


        page.section('Notifications?', section => {
            section.enumSetting('sendPushMessage').name('Send a push notification?');

        });


        page.section('Message interval?', section => {
            section.numberSetting('messageDelay').name('Minutes (default to every message)');

        });


    })
