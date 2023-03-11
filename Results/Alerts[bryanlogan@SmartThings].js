
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Notify for...', section => {
            section.deviceSetting('contact1').capability(['contactSensor']).name('Open/close sensors');
            section.deviceSetting('motion').capability(['motionSensor']).name('Motion sensors');
            section.deviceSetting('ArrivalPresence').capability(['presenceSensor']).name('Arrival Of');
            section.deviceSetting('DeparturePresence').capability(['presenceSensor']).name('Departure Of');
            section.deviceSetting('Smoke1').capability(['smokeDetector']).name('Smoke Detected');
            section.deviceSetting('Water').capability(['waterSensor']).name('Water Sensor Wet');

        });


        page.section('Notifications', section => {
            section.deviceSetting('TTSDevice').capability(['speechSynthesis']).name('TTS Device');

        });


    })
