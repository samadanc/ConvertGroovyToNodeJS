
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Choose which devices to monitor...', section => {
            section.deviceSetting('accelerometers').capability(['accelerationSensor']).name('Accelerometers');
            section.deviceSetting('alarms').capability(['alarm']).name('Alarms');
            section.deviceSetting('batteries').capability(['battery']).name('Batteries');
            section.deviceSetting('beacons').capability(['beacon']).name('Beacons');
            section.deviceSetting('cos').capability(['carbonMonoxideDetector']).name('Carbon  Monoxide Detectors');
            section.deviceSetting('colors').capability(['colorControl']).name('Color Controllers');
            section.deviceSetting('contacts').capability(['contactSensor']).name('Contact Sensors');
            section.deviceSetting('doorsControllers').capability(['doorControl']).name('Door Controllers');
            section.deviceSetting('energyMeters').capability(['energyMeter']).name('Energy Meters');
            section.deviceSetting('illuminances').capability(['illuminanceMeasurement']).name('Illuminance Meters');
            section.deviceSetting('locks').capability(['lock']).name('Locks');
            section.deviceSetting('motions').capability(['motionSensor']).name('Motion Sensors');
            section.deviceSetting('musicPlayers').capability(['musicPlayer']).name('Music Players');
            section.deviceSetting('powerMeters').capability(['powerMeter']).name('Power Meters');
            section.deviceSetting('presences').capability(['presenceSensor']).name('Presence Sensors');
            section.deviceSetting('humidities').capability(['relativeHumidityMeasurement']).name('Humidity Meters');
            section.deviceSetting('relaySwitches').capability(['relaySwitch']).name('Relay Switches');
            section.deviceSetting('sleepSensors').capability(['sleepSensor']).name('Sleep Sensors');
            section.deviceSetting('smokeDetectors').capability(['smokeDetector']).name('Smoke Detectors');
            section.deviceSetting('peds').capability(['stepSensor']).name('Pedometers');
            section.deviceSetting('switches').capability(['switch']).name('Switches');
            section.deviceSetting('switchLevels').capability(['switchLevel']).name('Switch Levels');
            section.deviceSetting('temperatures').capability(['temperatureMeasurement']).name('Temperature Sensors');
            section.deviceSetting('thermostats').capability(['thermostat']).name('Thermostats');
            section.deviceSetting('valves').capability(['valve']).name('Valves');
            section.deviceSetting('waterSensors').capability(['waterSensor']).name('Water Sensors');

        });


    })
