
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Choose one or more, when...', section => {
            section.deviceSetting('motion').capability(['motionSensor']).name('Motion Here');
            section.deviceSetting('Nomotion').capability(['motionSensor']).name('No Motion Here');
            section.deviceSetting('contact').capability(['contactSensor']).name('Contact Opens');
            section.deviceSetting('contactClosed').capability(['contactSensor']).name('Contact Closes');
            section.deviceSetting('acceleration').capability(['accelerationSensor']).name('Acceleration Detected');
            section.deviceSetting('Noacceleration').capability(['accelerationSensor']).name('No Acceleration Detected');
            section.deviceSetting('mySwitch').capability(['switch']).name('Switch Turned On');
            section.deviceSetting('mySwitchOff').capability(['switch']).name('Switch Turned Off');
            section.deviceSetting('arrivalPresence').capability(['presenceSensor']).name('Arrival Of');
            section.deviceSetting('departurePresence').capability(['presenceSensor']).name('Departure Of');
            section.deviceSetting('smoke').capability(['smokeDetector']).name('Smoke Detected');
            section.deviceSetting('water').capability(['waterSensor']).name('Water Sensor Wet');
            section.deviceSetting('locksLocked').capability(['lock']).name('Lock Locked?');
            section.deviceSetting('locksUnlocked').capability(['lock']).name('Lock Unlock?');

        });


        page.section('Server address and port number', section => {
            section.textSetting('server').name('Server IP');
            section.numberSetting('port').name('Port');

        });


    })

    .updated(async (context, updateData) => {

    })
