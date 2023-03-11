
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Control these bulbs...', section => {
            section.deviceSetting('bulbs').capability(['colorControl']).name('Which bulbs?');

        });


        page.section('Choose one or more, when...', section => {
            section.deviceSetting('motion').capability(['motionSensor']).name('Motion is detected');
            section.deviceSetting('contact').capability(['contactSensor']).name('Sensor opens');
            section.deviceSetting('contactClosed').capability(['contactSensor']).name('Sensor closes');
            section.deviceSetting('acceleration').capability(['accelerationSensor']).name('Acceleration is detected');
            section.deviceSetting('button1').capability(['button']).name('Button is pressed');
            section.deviceSetting('mySwitch').capability(['switch']).name('Switch is turned on');
            section.deviceSetting('mySwitchOff').capability(['switch']).name('Switch is turned off');
            section.deviceSetting('arrivalPresence').capability(['presenceSensor']).name('Someone arrives');
            section.deviceSetting('departurePresence').capability(['presenceSensor']).name('Someone departs');
            section.deviceSetting('smoke').capability(['smokeDetector']).name('Smoke is detected');
            section.deviceSetting('water').capability(['waterSensor']).name('Water is detected');
            section.timeSetting('timeOfDay').name('The time is');

        });


        page.section('Choose bulb effects...', section => {
            section.enumSetting('inputColor').name('Color');
            section.enumSetting('inputLevel').name('Brightness');
            section.numberSetting('duration').name('Number of seconds');
            section.enumSetting('turnOn').name('Turn on when off?');

        });


        page.section('Minimum time between notifications (optional, defaults to every notification)', section => {

        });


    })
