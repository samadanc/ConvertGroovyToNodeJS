
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

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

        });


        page.section('Perform this action', section => {
            section.enumSetting('actionType').name('Action?');

        });


        page.section('', section => {
            section.deviceSetting('sonos').capability(['musicPlayer']).name('Sonos Device');

        });


        page.section('Minimum time between actions (optional, defaults to every event)', section => {

        });


        page.section('['expandable': false, 'expanded': false], 'More options', section => {
            section.numberSetting('volume').name('Temporarily change volume');
            section.booleanSetting('resumePlaying').name('Resume playing music');

        });


    })
