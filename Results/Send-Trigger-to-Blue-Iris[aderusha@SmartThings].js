
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Blue Iris server details', section => {
            section.textSetting('biServer').name('Server');
            section.numberSetting('biPort').name('Port');
            section.textSetting('biUser').name('User name');

        });


        page.section('Blue Iris Camera Name', section => {
            section.textSetting('biCamera').name('Camera Name');

        });


        page.section('Select events to be sent to Blue Iris', section => {
            section.deviceSetting('myMotion').capability(['motionSensor']).name('Motion Sensors');
            section.deviceSetting('myContact').capability(['contactSensor']).name('Contact Sensors');

        });


    })
