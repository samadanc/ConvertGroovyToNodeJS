
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('People', section => {
            section.deviceSetting('people').capability(['presenceSensor']).name('People');

        });


        page.section('Motion Sensors', section => {
            section.deviceSetting('motions').capability(['motionSensor']).name('Motion Sensor(s)');

        });


        page.section('Lights', section => {
            section.deviceSetting('switches').capability(['switch']).name('Light(s)');

        });


        page.section('Thermostat(s)', section => {
            section.deviceSetting('ecobee').capability(['thermostat']).name('Thermostat(s)');

        });


        page.section('Locks', section => {
            section.deviceSetting('locks').capability(['lock']).name('Lock(s)');

        });


        page.section('Door(s)', section => {
            section.deviceSetting('garageDoorControls').capability(['garageDoorControl']).name('Garage Door(s)');
            section.deviceSetting('doorControls').capability(['doorControl']).name('Door(s)');
            section.deviceSetting('contactSensors').capability(['contactSensor']).name('Misc');

        });


        page.section('Not Present debounce timer [default=3 minutes]', section => {
            section.numberSetting('residentsQuietThreshold').name('Time in minutes');

        });


        page.section('Notifications', section => {
            section.enumSetting('sendPushMessage').name('Would you like push notifications');

        });


        page.section('Detailed Notifications', section => {
            section.booleanSetting('detailedNotif').name('Do you want tons of Notifications?');

        });


        page.section('What is your People Not Present Climate Name [default=Away]', section => {
            section.textSetting('givenClimateNameNP').name('Climate Name');

        });


        page.section('want to turn on mega-debugging?', section => {
            section.booleanSetting('debugMode').name('Debug Mode?');

        });


    })
