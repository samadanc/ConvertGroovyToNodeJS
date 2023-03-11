
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Devices To Monitor:', section => {
            section.deviceSetting('accelerationSensors').capability(['accelerationSensor']).name('Acceleration Sensors');
            section.deviceSetting('airConditionerModes').capability(['airConditionerMode']).name('Air Conditioner Modes');
            section.deviceSetting('airQualitySensors').capability(['airQualitySensor']).name('Air Quality Sensors');
            section.deviceSetting('alarms').capability(['alarm']).name('Alarms');
            section.deviceSetting('audioMutes').capability(['audioMute']).name('Audio Mutes');
            section.deviceSetting('audioTrackDatas').capability(['audioTrackData']).name('Audio Track Datas');
            section.deviceSetting('audioVolumes').capability(['audioVolume']).name('Audio Volumes');
            section.deviceSetting('batteries').capability(['battery']).name('Batteries');
            section.deviceSetting('beacons').capability(['beacon']).name('Beacons');
            section.deviceSetting('carbonDioxideMeasurements').capability(['carbonDioxideMeasurement']).name('Carbon Dioxide Measurements');
            section.deviceSetting('carbonMonoxideDetectors').capability(['carbonMonoxideDetector']).name('Carbon Monoxide Detectors');
            section.deviceSetting('colorControls').capability(['colorControl']).name('Color Controls');
            section.deviceSetting('colorTemperatures').capability(['colorTemperature']).name('Color Temperatures');
            section.deviceSetting('colors').capability(['color']).name('Colors');
            section.deviceSetting('colorModes').capability(['colorMode']).name('Color Modes');
            section.deviceSetting('consumables').capability(['consumable']).name('Consumables');
            section.deviceSetting('contactSensors').capability(['contactSensor']).name('Contact Sensors');
            section.deviceSetting('demandResponseLoadControls').capability(['demandResponseLoadControl']).name('Demand Response Load Controls');
            section.deviceSetting('dishwasherModes').capability(['dishwasherMode']).name('Dishwasher Modes');
            section.deviceSetting('dishwasherOperatingStates').capability(['dishwasherOperatingState']).name('Dishwasher Operating States');
            section.deviceSetting('doorControls').capability(['doorControl']).name('Door Controls');
            section.deviceSetting('dryerModes').capability(['dryerMode']).name('Dryer Modes');
            section.deviceSetting('dryerOperatingStates').capability(['dryerOperatingState']).name('Dryer Operating States');
            section.deviceSetting('dustSensors').capability(['dustSensor']).name('Dust Sensors');
            section.deviceSetting('energyMeters').capability(['energyMeter']).name('Energy Meters');
            section.deviceSetting('estimatedTimeOfArrivals').capability(['estimatedTimeOfArrival']).name('Estimated Time Of Arrivals');
            section.deviceSetting('executes').capability(['execute']).name('Executes');
            section.deviceSetting('fanSpeeds').capability(['fanSpeed']).name('Fan Speeds');
            section.deviceSetting('filterStatus').capability(['filterStatus']).name('Filter Status');
            section.deviceSetting('garageDoorControls').capability(['garageDoorControl']).name('Garage Door Controls');
            section.deviceSetting('geolocations').capability(['geolocation']).name('Geolocations');
            section.deviceSetting('holdableButtons').capability(['holdableButton']).name('Holdable Buttons');
            section.deviceSetting('illuminanceMeasurements').capability(['illuminanceMeasurement']).name('Illuminance Measurements');
            section.deviceSetting('imageCaptures').capability(['imageCapture']).name('Image Captures');
            section.deviceSetting('indicators').capability(['indicator']).name('Indicators');
            section.deviceSetting('infraredLevels').capability(['infraredLevel']).name('Infrared Levels');
            section.deviceSetting('lights').capability(['light']).name('Lights');
            section.deviceSetting('lockOnlies').capability(['lockOnly']).name('Lock Onlies');
            section.deviceSetting('locks').capability(['lock']).name('Locks');
            section.deviceSetting('mediaInputSources').capability(['mediaInputSource']).name('Media Input Sources');
            section.deviceSetting('mediaPlaybackRepeats').capability(['mediaPlaybackRepeat']).name('Media Playback Repeats');
            section.deviceSetting('mediaPlaybackShuffles').capability(['mediaPlaybackShuffle']).name('Media Playback Shuffles');
            section.deviceSetting('mediaPlaybacks').capability(['mediaPlayback']).name('Media Playbacks');
            section.deviceSetting('mediaPresets').capability(['mediaPresets']).name('Media Presets');
            section.deviceSetting('motionSensors').capability(['motionSensor']).name('Motion Sensors');
            section.deviceSetting('musicPlayers').capability(['musicPlayer']).name('Music Players');
            section.deviceSetting('odorSensors').capability(['odorSensor']).name('Odor Sensors');
            section.deviceSetting('outlets').capability(['outlet']).name('Outlets');
            section.deviceSetting('ovenModes').capability(['ovenMode']).name('Oven Modes');
            section.deviceSetting('ovenOperatingStates').capability(['ovenOperatingState']).name('Oven Operating States');
            section.deviceSetting('ovenSetpoints').capability(['ovenSetpoint']).name('Oven Setpoints');
            section.deviceSetting('pHMeasurements').capability(['pHMeasurement']).name('pH Measurements');
            section.deviceSetting('powerConsumptionReports').capability(['powerConsumptionReport']).name('Power Consumption Reports');
            section.deviceSetting('powerMeters').capability(['powerMeter']).name('Power Meters');
            section.deviceSetting('powerSources').capability(['powerSource']).name('Power Sources');
            section.deviceSetting('presenceSensors').capability(['presenceSensor']).name('Presence Sensors');
            section.deviceSetting('rapidCoolings').capability(['rapidCooling']).name('Rapid Coolings');
            section.deviceSetting('refrigerationSetpoints').capability(['refrigerationSetpoint']).name('Refrigeration Setpoints');
            section.deviceSetting('relativeHumidityMeasurements').capability(['relativeHumidityMeasurement']).name('Relative Humidity Measurements');
            section.deviceSetting('relaySwitches').capability(['relaySwitch']).name('Relay Switches');
            section.deviceSetting('robotCleanerCleaningModes').capability(['robotCleanerCleaningMode']).name('Robot Cleaner Cleaning Modes');
            section.deviceSetting('robotCleanerMovements').capability(['robotCleanerMovement']).name('Robot Cleaner Movements');
            section.deviceSetting('robotCleanerTurboModes').capability(['robotCleanerTurboMode']).name('Robot Cleaner Turbo Modes');
            section.deviceSetting('shockSensors').capability(['shockSensor']).name('Shock Sensors');
            section.deviceSetting('signalStrengths').capability(['signalStrength']).name('Signal Strengths');
            section.deviceSetting('sleepSensors').capability(['sleepSensor']).name('Sleep Sensors');
            section.deviceSetting('smokeDetectors').capability(['smokeDetector']).name('Smoke Detectors');
            section.deviceSetting('soundPressureLevels').capability(['soundPressureLevel']).name('Sound Pressure Levels');
            section.deviceSetting('soundSensors').capability(['soundSensor']).name('Sound Sensors');
            section.deviceSetting('speechRecognitions').capability(['speechRecognition']).name('Speech Recognitions');
            section.deviceSetting('stepSensors').capability(['stepSensor']).name('Step Sensors');
            section.deviceSetting('switchLevels').capability(['switchLevel']).name('Switch Levels');
            section.deviceSetting('switches').capability(['switch']).name('Switches');
            section.deviceSetting('tamperAlerts').capability(['tamperAlert']).name('Tamper Alerts');
            section.deviceSetting('temperatureMeasurements').capability(['temperatureMeasurement']).name('Temperature Measurements');
            section.deviceSetting('thermostatCoolingSetpoints').capability(['thermostatCoolingSetpoint']).name('Thermostat Cooling Setpoints');
            section.deviceSetting('thermostatFanModes').capability(['thermostatFanMode']).name('Thermostat Fan Modes');
            section.deviceSetting('thermostatHeatingSetpoints').capability(['thermostatHeatingSetpoint']).name('Thermostat Heating Setpoints');
            section.deviceSetting('thermostatModes').capability(['thermostatMode']).name('Thermostat Modes');
            section.deviceSetting('thermostatOperatingStates').capability(['thermostatOperatingState']).name('Thermostat Operating States');
            section.deviceSetting('thermostatSetpoints').capability(['thermostatSetpoint']).name('Thermostat Setpoints');
            section.deviceSetting('thermostats').capability(['thermostat']).name('Thermostats');
            section.deviceSetting('threeAxis').capability(['threeAxis']).name('Three Axis');
            section.deviceSetting('timedSessions').capability(['timedSession']).name('Timed Sessions');
            section.deviceSetting('touchSensors').capability(['touchSensor']).name('Touch Sensors');
            section.deviceSetting('tvChannels').capability(['tvChannel']).name('Tv Channels');
            section.deviceSetting('ultravioletIndexs').capability(['ultravioletIndex']).name('Ultraviolet Indexs');
            section.deviceSetting('valves').capability(['valve']).name('Valves');
            section.deviceSetting('videoClips').capability(['videoClips']).name('Video Clips');
            section.deviceSetting('videoStreams').capability(['videoStream']).name('Video Streams');
            section.deviceSetting('voltageMeasurements').capability(['voltageMeasurement']).name('Voltage Measurements');
            section.deviceSetting('washerModes').capability(['washerMode']).name('Washer Modes');
            section.deviceSetting('washerOperatingStates').capability(['washerOperatingState']).name('Washer Operating States');
            section.deviceSetting('waterSensors').capability(['waterSensor']).name('Water Sensors');
            section.deviceSetting('windowShades').capability(['windowShade']).name('Window Shades');

        });


        page.section('OSIsoft PIWebAPI', section => {
            section.textSetting('pi').name('PI Server Name?');
            section.textSetting('piwebapi').name('PI Web API Url?');
            section.textSetting('piid').name('PI Web API Id?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.colorControls, 'colorControl', 'hue', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.thermostats, 'thermostat', 'supportedThermostatModes', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.smokeDetectors, 'smokeDetector', 'smoke', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.dishwasherOperatingStates, 'dishwasherOperatingState', 'completionTime', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.audioTrackDatas, 'audioTrackData', 'audioTrackData', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.thermostats, 'thermostat', 'coolingSetpoint', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.stepSensors, 'stepSensor', 'goal', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.thermostatModes, 'thermostatMode', 'thermostatMode', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.ovenModes, 'ovenMode', 'ovenMode', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.valves, 'valve', 'valve', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.dishwasherOperatingStates, 'dishwasherOperatingState', 'dishwasherJobState', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.carbonMonoxideDetectors, 'carbonMonoxideDetector', 'carbonMonoxide', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.batteries, 'battery', 'battery', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.colorTemperatures, 'colorTemperature', 'colorTemperature', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.geolocations, 'geolocation', 'altitudeAccuracy', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.estimatedTimeOfArrivals, 'estimatedTimeOfArrival', 'eta', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.videoClips, 'videoClips', 'videoClip', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.tvChannels, 'tvChannel', 'tvChannel', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.ovenOperatingStates, 'ovenOperatingState', 'machineState', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.sleepSensors, 'sleepSensor', 'sleeping', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.audioVolumes, 'audioVolume', 'volume', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.mediaInputSources, 'mediaInputSource', 'supportedInputSources', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.thermostatSetpoints, 'thermostatSetpoint', 'thermostatSetpoint', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.ovenOperatingStates, 'ovenOperatingState', 'ovenJobState', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.powerMeters, 'powerMeter', 'power', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.shockSensors, 'shockSensor', 'shock', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.lockOnlies, 'lockOnly', 'lock', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.tamperAlerts, 'tamperAlert', 'tamper', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.motionSensors, 'motionSensor', 'motion', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.speechRecognitions, 'speechRecognition', 'phraseSpoken', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.dishwasherOperatingStates, 'dishwasherOperatingState', 'machineState', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.consumables, 'consumable', 'consumableStatus', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.airQualitySensors, 'airQualitySensor', 'airQuality', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.ovenOperatingStates, 'ovenOperatingState', 'completionTime', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.airConditionerModes, 'airConditionerMode', 'airConditionerMode', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.dryerModes, 'dryerMode', 'dryerMode', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.threeAxis, 'threeAxis', 'threeAxis', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.thermostats, 'thermostat', 'coolingSetpointRange', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.robotCleanerCleaningModes, 'robotCleanerCleaningMode', 'robotCleanerCleaningMode', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.beacons, 'beacon', 'presence', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.locks, 'lock', 'lock', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.contactSensors, 'contactSensor', 'contact', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.alarms, 'alarm', 'alarm', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.thermostatOperatingStates, 'thermostatOperatingState', 'thermostatOperatingState', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.garageDoorControls, 'garageDoorControl', 'door', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.musicPlayers, 'musicPlayer', 'mute', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.fanSpeeds, 'fanSpeed', 'fanSpeed', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.touchSensors, 'touchSensor', 'touch', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.powerSources, 'powerSource', 'powerSource', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.infraredLevels, 'infraredLevel', 'infraredLevel', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.powerConsumptionReports, 'powerConsumptionReport', 'powerConsumption', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.robotCleanerMovements, 'robotCleanerMovement', 'robotCleanerMovement', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.rapidCoolings, 'rapidCooling', 'rapidCooling', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.switchLevels, 'switchLevel', 'level', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.robotCleanerTurboModes, 'robotCleanerTurboMode', 'robotCleanerTurboMode', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.dryerOperatingStates, 'dryerOperatingState', 'supportedMachineStates', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.voltageMeasurements, 'voltageMeasurement', 'voltage', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.thermostats, 'thermostat', 'thermostatOperatingState', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.accelerationSensors, 'accelerationSensor', 'acceleration', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.carbonDioxideMeasurements, 'carbonDioxideMeasurement', 'carbonDioxide', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.soundSensors, 'soundSensor', 'sound', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.ovenSetpoints, 'ovenSetpoint', 'ovenSetpoint', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.washerOperatingStates, 'washerOperatingState', 'supportedMachineStates', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.geolocations, 'geolocation', 'heading', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.musicPlayers, 'musicPlayer', 'trackDescription', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.mediaPresets, 'mediaPresets', 'presets', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.thermostats, 'thermostat', 'thermostatFanMode', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.signalStrengths, 'signalStrength', 'rssi', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.mediaPlaybacks, 'mediaPlayback', 'playbackStatus', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.outlets, 'outlet', 'switch', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.colors, 'color', 'colorValue', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.mediaInputSources, 'mediaInputSource', 'inputSource', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.presenceSensors, 'presenceSensor', 'presence', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.ovenOperatingStates, 'ovenOperatingState', 'operationTime', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.soundPressureLevels, 'soundPressureLevel', 'soundPressureLevel', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.switches, 'switch', 'switch', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.musicPlayers, 'musicPlayer', 'trackData', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.dustSensors, 'dustSensor', 'fineDustLevel', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.lights, 'light', 'switch', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.thermostats, 'thermostat', 'supportedThermostatFanModes', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.thermostatCoolingSetpoints, 'thermostatCoolingSetpoint', 'coolingSetpoint', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.thermostatFanModes, 'thermostatFanMode', 'supportedThermostatFanModes', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.washerModes, 'washerMode', 'washerMode', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.signalStrengths, 'signalStrength', 'lqi', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.geolocations, 'geolocation', 'longitude', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.thermostatModes, 'thermostatMode', 'supportedThermostatModes', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.colorModes, 'colorMode', 'colorMode', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.ovenOperatingStates, 'ovenOperatingState', 'supportedMachineStates', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.indicators, 'indicator', 'indicatorStatus', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.timedSessions, 'timedSession', 'sessionStatus', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.timedSessions, 'timedSession', 'completionTime', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.filterStatus, 'filterStatus', 'filterStatus', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.dishwasherOperatingStates, 'dishwasherOperatingState', 'supportedMachineStates', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.colorControls, 'colorControl', 'saturation', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.geolocations, 'geolocation', 'speed', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.illuminanceMeasurements, 'illuminanceMeasurement', 'illuminance', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.stepSensors, 'stepSensor', 'steps', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.refrigerationSetpoints, 'refrigerationSetpoint', 'refrigerationSetpoint', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.dryerOperatingStates, 'dryerOperatingState', 'completionTime', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.mediaPlaybacks, 'mediaPlayback', 'level', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.thermostatHeatingSetpoints, 'thermostatHeatingSetpoint', 'heatingSetpoint', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.colorControls, 'colorControl', 'color', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.imageCaptures, 'imageCapture', 'image', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.relativeHumidityMeasurements, 'relativeHumidityMeasurement', 'humidity', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.dryerOperatingStates, 'dryerOperatingState', 'machineState', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.thermostats, 'thermostat', 'heatingSetpointRange', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.geolocations, 'geolocation', 'latitude', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.thermostats, 'thermostat', 'heatingSetpoint', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.temperatureMeasurements, 'temperatureMeasurement', 'temperature', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.holdableButtons, 'holdableButton', 'numberOfButtons', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.windowShades, 'windowShade', 'windowShade', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.washerOperatingStates, 'washerOperatingState', 'machineState', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.musicPlayers, 'musicPlayer', 'status', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.thermostats, 'thermostat', 'schedule', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.mediaPlaybackShuffles, 'mediaPlaybackShuffle', 'playbackShuffle', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.washerOperatingStates, 'washerOperatingState', 'completionTime', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.thermostats, 'thermostat', 'thermostatMode', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.odorSensors, 'odorSensor', 'odorLevel', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.dishwasherModes, 'dishwasherMode', 'dishwasherMode', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.dryerOperatingStates, 'dryerOperatingState', 'dryerJobState', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.geolocations, 'geolocation', 'accuracy', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.dustSensors, 'dustSensor', 'dustLevel', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.energyMeters, 'energyMeter', 'energy', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.demandResponseLoadControls, 'demandResponseLoadControl', 'drlcStatus', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.thermostats, 'thermostat', 'temperature', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.thermostats, 'thermostat', 'thermostatSetpoint', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.geolocations, 'geolocation', 'lastUpdateTime', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.ultravioletIndexs, 'ultravioletIndex', 'ultravioletIndex', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.doorControls, 'doorControl', 'door', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.geolocations, 'geolocation', 'method', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.relaySwitches, 'relaySwitch', 'switch', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.washerOperatingStates, 'washerOperatingState', 'washerJobState', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.musicPlayers, 'musicPlayer', 'level', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.executes, 'execute', 'data', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.audioMutes, 'audioMute', 'mute', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.holdableButtons, 'holdableButton', 'button', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.thermostatFanModes, 'thermostatFanMode', 'thermostatFanMode', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.mediaPlaybackRepeats, 'mediaPlaybackRepeat', 'playbackRepeatMode', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.videoStreams, 'videoStream', 'stream', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.waterSensors, 'waterSensor', 'water', 'evtHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.pHMeasurements, 'pHMeasurement', 'pH', 'evtHandler')

    })

    .subscribedEventHandler('evtHandler', (context, event) => {
        
        let evtName = "${event.name}"
        let devName = event.getDevice().getName()
        let tagName = "$devName" + '.' + "$evtName"
        let evtValue = event.value
        let evtTime = "${event.isoDate}"
        console.log("$tagname : $evtTime : $evtValue")
        this.piWriter(tagName, evtValue, evtTime)
        

	})
