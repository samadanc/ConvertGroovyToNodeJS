
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('General:', section => {
            section.enumSetting('configLoggingLevelIDE').name('IDE Live Logging Level:\nMessages with this level and higher will be logged to the IDE.');

        });


        page.section('InfluxDB Database:', section => {
            section.textSetting('prefDatabaseHost').name('Host');
            section.textSetting('prefDatabasePort').name('Port');
            section.textSetting('prefDatabaseName').name('Database Name');
            section.textSetting('prefDatabaseUser').name('Username');
            section.textSetting('prefDatabasePass').name('Password');

        });


        page.section('Polling:', section => {
            section.numberSetting('prefSoftPollingInterval').name('Soft-Polling interval (minutes)');

        });


        page.section('System Monitoring:', section => {
            section.booleanSetting('prefLogModeEvents').name('Log Mode Events?');
            section.booleanSetting('prefLogHubProperties').name('Log Hub Properties?');
            section.booleanSetting('prefLogLocationProperties').name('Log Location Properties?');

        });


        page.section('Devices To Monitor:', section => {
            section.deviceSetting('accelerometers').capability(['accelerationSensor']).name('Accelerometers');
            section.deviceSetting('alarms').capability(['alarm']).name('Alarms');
            section.deviceSetting('batteries').capability(['battery']).name('Batteries');
            section.deviceSetting('beacons').capability(['beacon']).name('Beacons');
            section.deviceSetting('buttons').capability(['button']).name('Buttons');
            section.deviceSetting('cos').capability(['carbonMonoxideDetector']).name('Carbon Monoxide Detectors');
            section.deviceSetting('co2s').capability(['carbonDioxideMeasurement']).name('Carbon Dioxide Detectors');
            section.deviceSetting('colors').capability(['colorControl']).name('Color Controllers');
            section.deviceSetting('consumables').capability(['consumable']).name('Consumables');
            section.deviceSetting('contacts').capability(['contactSensor']).name('Contact Sensors');
            section.deviceSetting('doorsControllers').capability(['doorControl']).name('Door Controllers');
            section.deviceSetting('energyMeters').capability(['energyMeter']).name('Energy Meters');
            section.deviceSetting('humidities').capability(['relativeHumidityMeasurement']).name('Humidity Meters');
            section.deviceSetting('illuminances').capability(['illuminanceMeasurement']).name('Illuminance Meters');
            section.deviceSetting('locks').capability(['lock']).name('Locks');
            section.deviceSetting('motions').capability(['motionSensor']).name('Motion Sensors');
            section.deviceSetting('musicPlayers').capability(['musicPlayer']).name('Music Players');
            section.deviceSetting('peds').capability(['stepSensor']).name('Pedometers');
            section.deviceSetting('phMeters').capability(['pHMeasurement']).name('pH Meters');
            section.deviceSetting('powerMeters').capability(['powerMeter']).name('Power Meters');
            section.deviceSetting('presences').capability(['presenceSensor']).name('Presence Sensors');
            section.deviceSetting('pressures').capability(['sensor']).name('Pressure Sensors');
            section.deviceSetting('shockSensors').capability(['shockSensor']).name('Shock Sensors');
            section.deviceSetting('signalStrengthMeters').capability(['signalStrength']).name('Signal Strength Meters');
            section.deviceSetting('sleepSensors').capability(['sleepSensor']).name('Sleep Sensors');
            section.deviceSetting('smokeDetectors').capability(['smokeDetector']).name('Smoke Detectors');
            section.deviceSetting('soundSensors').capability(['soundSensor']).name('Sound Sensors');
            section.deviceSetting('spls').capability(['soundPressureLevel']).name('Sound Pressure Level Sensors');
            section.deviceSetting('switches').capability(['switch']).name('Switches');
            section.deviceSetting('switchLevels').capability(['switchLevel']).name('Switch Levels');
            section.deviceSetting('tamperAlerts').capability(['tamperAlert']).name('Tamper Alerts');
            section.deviceSetting('temperatures').capability(['temperatureMeasurement']).name('Temperature Sensors');
            section.deviceSetting('thermostats').capability(['thermostat']).name('Thermostats');
            section.deviceSetting('threeAxis').capability(['threeAxis']).name('Three-axis (Orientation) Sensors');
            section.deviceSetting('touchs').capability(['touchSensor']).name('Touch Sensors');
            section.deviceSetting('uvs').capability(['ultravioletIndex']).name('UV Sensors');
            section.deviceSetting('valves').capability(['valve']).name('Valves');
            section.deviceSetting('volts').capability(['voltageMeasurement']).name('Voltage Meters');
            section.deviceSetting('waterSensors').capability(['waterSensor']).name('Water Sensors');
            section.deviceSetting('windowShades').capability(['windowShade']).name('Window Shades');

        });


    })
