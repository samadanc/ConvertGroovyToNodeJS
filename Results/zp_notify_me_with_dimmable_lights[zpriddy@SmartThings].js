
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Control these bulbs...', section => {
            section.deviceSetting('hues').capability(['colorControl']).name('Which Hue Bulbs?');

        });


        page.section('Control these bulbs... (none Hues)', section => {
            section.deviceSetting('lights').capability(['switchLevel']).name('Which light Bulbs?');

        });


        page.section('Choose one or more, when...', section => {
            section.deviceSetting('motion').capability(['motionSensor']).name('Motion Here');
            section.deviceSetting('contact').capability(['contactSensor']).name('Contact Opens');
            section.deviceSetting('contactClosed').capability(['contactSensor']).name('Contact Closes');
            section.deviceSetting('acceleration').capability(['accelerationSensor']).name('Acceleration Detected');
            section.deviceSetting('mySwitch').capability(['switch']).name('Switch Turned On');
            section.deviceSetting('mySwitchOff').capability(['switch']).name('Switch Turned Off');
            section.deviceSetting('arrivalPresence').capability(['presenceSensor']).name('Arrival Of');
            section.deviceSetting('departurePresence').capability(['presenceSensor']).name('Departure Of');
            section.deviceSetting('smoke').capability(['smokeDetector']).name('Smoke Detected');
            section.deviceSetting('water').capability(['waterSensor']).name('Water Sensor Wet');
            section.deviceSetting('button1').capability(['button']).name('Button Press');
            section.timeSetting('timeOfDay').name('At a Scheduled Time');

        });


        page.section('Choose light effects...', section => {
            section.enumSetting('color').name('Hue Color?');
            section.enumSetting('lightLevel').name('Light Level?');
            section.numberSetting('duration').name('Duration Seconds?');

        });


        page.section('Minimum time between messages (optional, defaults to every message)', section => {

        });


    })
