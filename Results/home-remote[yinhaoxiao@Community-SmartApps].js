
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {
            section.deviceSetting('accelerationSensors').capability(['accelerationSensor']).name('Acceleration Sensors');
            section.deviceSetting('alarms').capability(['alarm']).name('Alarms');
            section.deviceSetting('batteries').capability(['battery']).name('Batteries');
            section.deviceSetting('beacons').capability(['beacon']).name('Beacons');
            section.deviceSetting('buttonGroup').capability(['button']).name('Buttone');
            section.deviceSetting('carbonMonoxideDetectors').capability(['carbonMonoxideDetector']).name('CO Detectors');
            section.deviceSetting('colorControls').capability(['colorControl']).name('Color Lights');
            section.deviceSetting('contactSensors').capability(['contactSensor']).name('Contact Sensors');
            section.deviceSetting('doorControls').capability(['doorControl']).name('Door Controllers');
            section.deviceSetting('energyMeters').capability(['energyMeter']).name('Energy Meters');
            section.deviceSetting('illuminanceMeasurements').capability(['illuminanceMeasurement']).name('Illuminance Sensors');
            section.deviceSetting('imageCaptures').capability(['imageCapture']).name('Cameras');
            section.deviceSetting('locks').capability(['lock']).name('Locks');
            section.deviceSetting('mediaControllers').capability(['mediaController']).name('Media Controllers');
            section.deviceSetting('momentaries').capability(['momentary']).name('Momentary Buttons');
            section.deviceSetting('motionSensors').capability(['motionSensor']).name('Motion Sensors');
            section.deviceSetting('musicPlayers').capability(['musicPlayer']).name('Music Players');
            section.deviceSetting('powerMeters').capability(['powerMeter']).name('Power Meters');
            section.deviceSetting('presenceSensors').capability(['presenceSensor']).name('Presence Sensors');
            section.deviceSetting('relativeHumidityMeasurements').capability(['relativeHumidityMeasurement']).name('Humidity Sensors');
            section.deviceSetting('relaySwitches').capability(['relaySwitch']).name('Relays');
            section.deviceSetting('sleepSensors').capability(['sleepSensor']).name('Sleep Sensors');
            section.deviceSetting('smokeDetectors').capability(['smokeDetector']).name('Smoke Detectors');
            section.deviceSetting('speechSyntheses').capability(['speechSynthesis']).name('Speech Synthesysers');
            section.deviceSetting('switches').capability(['switch']).name('Switches');
            section.deviceSetting('switchLevels').capability(['switchLevel']).name('Dimmers');
            section.deviceSetting('temperatureMeasurements').capability(['temperatureMeasurement']).name('Temperature Sensors');
            section.deviceSetting('thermostats').capability(['thermostat']).name('Thermostats');
            section.deviceSetting('threeAxes').capability(['threeAxis']).name('Three axis Sensors');
            section.deviceSetting('touchSensors').capability(['touchSensor']).name('Touch Sensors');
            section.deviceSetting('valves').capability(['valve']).name('Valves');
            section.deviceSetting('waterSensors').capability(['waterSensor']).name('Water Sensors');

        });


    })
