
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Litter Robot Cycle Sensor', section => {
            section.deviceSetting('robotSensor').capability(['contactSensor']).name('');

        });


        page.section('Litter Robot Drawer Sensor', section => {
            section.deviceSetting('resetSensor').capability(['contactSensor']).name('');

        });


        page.section('Litter Robot Virtual Device', section => {
            section.deviceSetting('litterRobot').capability(['actuator']).name('Litter Robot Virtual Device');

        });


        page.section('Alert after this many cycles', section => {
            section.numberSetting('maxCycles').name('Max Cycles?');

        });


        page.section('Auto Shutoff Options', section => {
            section.deviceSetting('robotSwitch').capability(['switch']).name('Litter Robot Switch');
            section.numberSetting('shutoffCycles').name('Shutoff After This Many Cycles');

        });


        page.section('Notifications', section => {
            section.enumSetting('sendPushMessage').name('Send a push notification?');

        });


    })
