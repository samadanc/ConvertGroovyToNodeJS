
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Garage door', section => {
            section.deviceSetting('doorSensor').capability(['contactSensor']).name('Which sensor?');
            section.deviceSetting('doorSwitch').capability(['momentary']).name('Which switch?');
            section.numberSetting('openThreshold').name('Warn when open longer than (optional)');
            section.enumSetting('autoCloseGarageDoor').name('Close the garage door after being open longer than selected minutes');
            section.enumSetting('skipcheck').name('Working in the garage and want to keep the door open with no alerts? (If Yes door open checks will NOT happen, will need to reset to No when you\');

        });


        page.section('Car(s) using this garage door', section => {
            section.deviceSetting('cars').capability(['presenceSensor']).name('Presence sensor');
            section.deviceSetting('carDoorSensors').capability(['accelerationSensor']).name('Car door sensor(s)');

        });


        page.section('Interior door (optional)', section => {
            section.deviceSetting('interiorDoorSensor').capability(['contactSensor']).name('Contact sensor?');

        });


        page.section('False alarm threshold (defaults to 10 min)', section => {
            section.numberSetting('falseAlarmThreshold').name('Number of minutes');

        });


    })

    .updated(async (context, updateData) => {

    })
