
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Triggers', section => {
            section.deviceSetting('motionSensors').capability(['motionSensor']).name('Motion');
            section.deviceSetting('contactSensors').capability(['contactSensor']).name('Contact');
            section.deviceSetting('buttonSensors').capability(['button']).name('Button');
            section.deviceSetting('accelerationSensors').capability(['accelerationSensor']).name('Acceleration');

        });


        page.section('MiniMote', section => {
            section.enumSetting('miniMoteBtn').name('MiniMote Button Number');

        });


        page.section('Targets', section => {
            section.deviceSetting('switches').capability(['switch']).name('Switches');

        });


        page.section('Action', section => {
            section.booleanSetting('onOrOff').name('On/Off');

        });


        page.section('Restore State', section => {
            section.numberSetting('restoreDelay').name('Minutes');
            section.booleanSetting('restoreOver').name('Even if state changes?');

        });


        page.section('Alerting', section => {
            section.booleanSetting('sendPushMessage').name('Send push on activation?');

        });


        page.section('Detailed light settings', section => {
            section.enumSetting('intensity').name('Intensity');
            section.enumSetting('colour').name('Colour');

        });


    })

    .updated(async (context, updateData) => {

    })
