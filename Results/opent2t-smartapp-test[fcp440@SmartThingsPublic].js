
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Allow OpenT2T to control these things...', section => {
            section.deviceSetting('contactSensors').capability(['contactSensor']).name('Which Contact Sensors');
            section.deviceSetting('garageDoors').capability(['garageDoorControl']).name('Which Garage Doors?');
            section.deviceSetting('locks').capability(['lock']).name('Which Locks?');
            section.deviceSetting('cameras').capability(['videoCapture']).name('Which Cameras?');
            section.deviceSetting('motionSensors').capability(['motionSensor']).name('Which Motion Sensors?');
            section.deviceSetting('presenceSensors').capability(['presenceSensor']).name('Which Presence Sensors');
            section.deviceSetting('switches').capability(['switch']).name('Which Switches and Lights?');
            section.deviceSetting('thermostats').capability(['thermostat']).name('Which Thermostat?');
            section.deviceSetting('waterSensors').capability(['waterSensor']).name('Which Water Leak Sensors?');

        });


    })
