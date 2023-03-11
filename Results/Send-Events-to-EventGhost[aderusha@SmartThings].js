
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('EventGhost server address and port', section => {
            section.textSetting('egServer').name('Server');
            section.numberSetting('egPort').name('Port');

        });


        page.section('EventGhost Command prefix', section => {
            section.textSetting('egPrefix').name('Command prefix');

        });


        page.section('Select events to be sent to EventGhost', section => {
            section.deviceSetting('mySwitch').capability(['switch']).name('Switches');
            section.deviceSetting('myDimmer').capability(['switchLevel']).name('Dimmers');
            section.deviceSetting('myColorControl').capability(['colorControl']).name('Color Controls');
            section.deviceSetting('myButton').capability(['button']).name('Buttons');
            section.deviceSetting('myMomentaryContact').capability(['momentary']).name('Momentary Contacts');
            section.deviceSetting('myMotion').capability(['motionSensor']).name('Motion Sensors');
            section.deviceSetting('myContact').capability(['contactSensor']).name('Contact Sensors');
            section.deviceSetting('myLock').capability(['lock']).name('Locks');
            section.deviceSetting('myThermostat').capability(['thermostat']).name('Thermostats');
            section.deviceSetting('myTemperature').capability(['temperatureMeasurement']).name('Temperature Sensors');
            section.deviceSetting('myBrightness').capability(['illuminanceMeasurement']).name('Light Sensors');
            section.deviceSetting('myHumidty').capability(['relativeHumidityMeasurement']).name('Humidty Sensors');
            section.deviceSetting('myEnergy').capability(['energyMeter']).name('Energy Sensors');
            section.deviceSetting('myPower').capability(['powerMeter']).name('Power Sensors');
            section.deviceSetting('myAcceleration').capability(['accelerationSensor']).name('Acceleration Sensors');
            section.deviceSetting('myPresence').capability(['presenceSensor']).name('Presence Sensors');
            section.deviceSetting('mySmoke').capability(['smokeDetector']).name('Smoke Sensors');
            section.deviceSetting('myWater').capability(['waterSensor']).name('Water Sensors');
            section.deviceSetting('myCO').capability(['carbonMonoxideDetector']).name('Carbon Monoxide Detectors');

        });


    })
