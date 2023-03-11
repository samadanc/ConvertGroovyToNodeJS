
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Allow external service to gather data', section => {
            section.deviceSetting('accelerationSensors').capability(['accelerationSensor']).name('accelerationSensor');
            section.deviceSetting('actuators').capability(['actuator']).name('actuator');
            section.deviceSetting('alarms').capability(['alarm']).name('alarm');
            section.deviceSetting('audioNotifications').capability(['audioNotification']).name('audioNotification');
            section.deviceSetting('batterys').capability(['battery']).name('battery');
            section.deviceSetting('beacons').capability(['beacon']).name('beacon');
            section.deviceSetting('bridges').capability(['bridge']).name('bridge');
            section.deviceSetting('bulbs').capability(['bulb']).name('bulb');
            section.deviceSetting('buttons').capability(['button']).name('button');
            section.deviceSetting('carbonDioxideMeasurements').capability(['carbonDioxideMeasurement']).name('carbonDioxideMeasurement');
            section.deviceSetting('carbonMonoxideDetectors').capability(['carbonMonoxideDetector']).name('carbonMonoxideDetector');
            section.deviceSetting('colorControls').capability(['colorControl']).name('colorControl');
            section.deviceSetting('colorTemperatures').capability(['colorTemperature']).name('colorTemperature');
            section.deviceSetting('configurations').capability(['configuration']).name('configuration');
            section.deviceSetting('consumables').capability(['consumable']).name('consumable');
            section.deviceSetting('contactSensors').capability(['contactSensor']).name('contactSensor');
            section.deviceSetting('doorControls').capability(['doorControl']).name('doorControl');
            section.deviceSetting('energyMeters').capability(['energyMeter']).name('energyMeter');
            section.deviceSetting('estimatedTimeOfArrivals').capability(['estimatedTimeOfArrival']).name('estimatedTimeOfArrival');
            section.deviceSetting('garageDoorControls').capability(['garageDoorControl']).name('garageDoorControl');
            section.deviceSetting('holdableButtons').capability(['holdableButton']).name('holdableButton');
            section.deviceSetting('illuminanceMeasurements').capability(['illuminanceMeasurement']).name('illuminanceMeasurement');
            section.deviceSetting('imageCaptures').capability(['imageCapture']).name('imageCapture');
            section.deviceSetting('indicators').capability(['indicator']).name('indicator');
            section.deviceSetting('infraredLevels').capability(['infraredLevel']).name('infraredLevel');
            section.deviceSetting('lights').capability(['light']).name('light');
            section.deviceSetting('locks').capability(['lock']).name('lock');
            section.deviceSetting('lockOnlys').capability(['lockOnly']).name('lockOnly');
            section.deviceSetting('mediaControllers').capability(['mediaController']).name('mediaController');
            section.deviceSetting('momentarys').capability(['momentary']).name('momentary');
            section.deviceSetting('motionSensors').capability(['motionSensor']).name('motionSensor');
            section.deviceSetting('musicPlayers').capability(['musicPlayer']).name('musicPlayer');
            section.deviceSetting('notifications').capability(['notification']).name('notification');
            section.deviceSetting('outlets').capability(['outlet']).name('outlet');
            section.deviceSetting('phMeasurements').capability(['pHMeasurement']).name('phMeasurement');
            section.deviceSetting('pollings').capability(['polling']).name('polling');
            section.deviceSetting('powerMeters').capability(['powerMeter']).name('powerMeter');
            section.deviceSetting('powerSources').capability(['powerSource']).name('powerSource');
            section.deviceSetting('presenceSensors').capability(['presenceSensor']).name('presenceSensor');
            section.deviceSetting('refreshs').capability(['refresh']).name('refresh');
            section.deviceSetting('relativeHumidityMeasurements').capability(['relativeHumidityMeasurement']).name('relativeHumidityMeasurement');
            section.deviceSetting('relaySwitchs').capability(['relaySwitch']).name('relaySwitch');
            section.deviceSetting('sensors').capability(['sensor']).name('sensor');
            section.deviceSetting('shockSensors').capability(['shockSensor']).name('shockSensor');
            section.deviceSetting('signalStrengths').capability(['signalStrength']).name('signalStrength');
            section.deviceSetting('sleepSensors').capability(['sleepSensor']).name('sleepSensor');
            section.deviceSetting('smokeDetectors').capability(['smokeDetector']).name('smokeDetector');
            section.deviceSetting('soundPressureLevels').capability(['soundPressureLevel']).name('soundPressureLevel');
            section.deviceSetting('soundSensors').capability(['soundSensor']).name('soundSensor');
            section.deviceSetting('speechRecognitions').capability(['speechRecognition']).name('speechRecognition');
            section.deviceSetting('speechSynthesiss').capability(['speechSynthesis']).name('speechSynthesis');
            section.deviceSetting('stepSensors').capability(['stepSensor']).name('stepSensor');
            section.deviceSetting('switchs').capability(['switch']).name('switch');
            section.deviceSetting('switchLevels').capability(['switchLevel']).name('switchLevel');
            section.deviceSetting('tamperAlerts').capability(['tamperAlert']).name('tamperAlert');
            section.deviceSetting('temperatureMeasurements').capability(['temperatureMeasurement']).name('temperatureMeasurement');
            section.deviceSetting('thermostats').capability(['thermostat']).name('thermostat');
            section.deviceSetting('thermostatCoolingSetpoints').capability(['thermostatCoolingSetpoint']).name('thermostatCoolingSetpoint');
            section.deviceSetting('thermostatFanModes').capability(['thermostatFanMode']).name('thermostatFanMode');
            section.deviceSetting('thermostatHeatingSetpoints').capability(['thermostatHeatingSetpoint']).name('thermostatHeatingSetpoint');
            section.deviceSetting('thermostatModes').capability(['thermostatMode']).name('thermostatMode');
            section.deviceSetting('thermostatOperatingStates').capability(['thermostatOperatingState']).name('thermostatOperatingState');
            section.deviceSetting('thermostatSetpoints').capability(['thermostatSetpoint']).name('thermostatSetpoint');
            section.deviceSetting('threeAxiss').capability(['threeAxis']).name('threeAxis');
            section.deviceSetting('timedSessions').capability(['timedSession']).name('timedSession');
            section.deviceSetting('tones').capability(['tone']).name('tone');
            section.deviceSetting('touchSensors').capability(['touchSensor']).name('touchSensor');
            section.deviceSetting('ultravioletIndexs').capability(['ultravioletIndex']).name('ultravioletIndex');
            section.deviceSetting('valves').capability(['valve']).name('valve');
            section.deviceSetting('voltageMeasurements').capability(['voltageMeasurement']).name('voltageMeasurement');
            section.deviceSetting('waterSensors').capability(['waterSensor']).name('waterSensor');
            section.deviceSetting('windowShades').capability(['windowShade']).name('windowShade');

        });


    })
