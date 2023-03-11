
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Should the app be enabled...', section => {

        });


        page.section('When a contact sensor is closed...', section => {
            section.deviceSetting('contactSensors').capability(['contactSensor']).name('Which contact sensors?');

        });


        page.section('And no motion is detected...', section => {
            section.deviceSetting('motionSensors').capability(['motionSensor']).name('Which motion sensors?');
            section.numberSetting('minutes1').name('Delay(in minutes) before setpoint');

        });


        page.section('Set thermostat...', section => {
            section.deviceSetting('thermostats').capability(['thermostat']).name('Choose Thermostats');
            section.enumSetting('thermMode').name('Set Mode');
            section.numberSetting('thermHeatSetpoint').name('Heat Setpoint');
            section.numberSetting('thermCoolSetpoint').name('Cool Setpoint');

        });


        page.section('Notifications', section => {
            section.enumSetting('logHelloHome').name('Log to Hello Home?');
            section.enumSetting('sendPushMessage').name('Send a push notification?');

        });


    })
