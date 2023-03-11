
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Garage door', section => {
            section.deviceSetting('door').capability(['doorControl']).name('Which garage door controller?');
            section.numberSetting('openThreshold').name('Warn when open longer than (optional)');

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
