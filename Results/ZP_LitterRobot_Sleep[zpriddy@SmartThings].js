
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Choose one or more, when...', section => {
            section.deviceSetting('button').capability(['button']).name('Button Pushed');
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

        });


        page.section('Delay this long... ', section => {
            section.numberSetting('delayTime').name('');

        });


        page.section('Turn on...', section => {
            section.deviceSetting('switches').capability(['switch']).name('');

        });


        page.section('Minimum time between messages (optional, defaults to every message)', section => {

        });


    })
