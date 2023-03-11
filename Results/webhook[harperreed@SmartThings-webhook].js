
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Webhook URL', section => {
            section.textSetting('url').name('Webhook URL');

        });


        page.section('Choose what events you want to trigger', section => {
            section.deviceSetting('accelerationSensor').capability(['accelerationSensor']).name('Acceleration Sensor');
            section.deviceSetting('alarm').capability(['alarm']).name('Alarm');
            section.deviceSetting('battery').capability(['battery']).name('Battery');
            section.deviceSetting('beacon').capability(['beacon']).name('Beacon');
            section.deviceSetting('button').capability(['button']).name('Button');
            section.deviceSetting('carbonMonoxideDetector').capability(['carbonMonoxideDetector']).name('Carbon Monoxide Detector');
            section.deviceSetting('colorControl').capability(['colorControl']).name('Color Control');
            section.deviceSetting('contactSensor').capability(['contactSensor']).name('Contact Sensor');
            section.deviceSetting('doorControl').capability(['doorControl']).name('Door Control');
            section.deviceSetting('energyMeter').capability(['energyMeter']).name('Energy Meter');
            section.deviceSetting('illuminanceMeasurement').capability(['illuminanceMeasurement']).name('Illuminance Measurement');
            section.deviceSetting('imageCapture').capability(['imageCapture']).name('Image Capture');
            section.deviceSetting('indicator').capability(['indicator']).name('Indicator');
            section.deviceSetting('locationMode').capability(['locationMode']).name('Location Mode');
            section.deviceSetting('lock').capability(['lock']).name('Lock');
            section.deviceSetting('mediaController').capability(['mediaController']).name('Media Controller');
            section.deviceSetting('motionSensor').capability(['motionSensor']).name('Motion Sensor');
            section.deviceSetting('musicPlayer').capability(['musicPlayer']).name('Music Player');
            section.deviceSetting('powerMeter').capability(['powerMeter']).name('Power Meter');
            section.deviceSetting('presenceSensor').capability(['presenceSensor']).name('Presence Sensor');
            section.deviceSetting('relativeHumidityMeasurement').capability(['relativeHumidityMeasurement']).name('Relative Humidity Measurement');
            section.deviceSetting('relaySwitch').capability(['relaySwitch']).name('Relay Switch');
            section.deviceSetting('sensor').capability(['sensor']).name('Sensor');
            section.deviceSetting('signalStrength').capability(['signalStrength']).name('Signal Strength');
            section.deviceSetting('sleepSensor').capability(['sleepSensor']).name('Sleep Sensor');
            section.deviceSetting('smokeDetector').capability(['smokeDetector']).name('Smoke Detector');
            section.deviceSetting('speechRecognition').capability(['speechRecognition']).name('Speech Recognition');
            section.deviceSetting('stepSensor').capability(['stepSensor']).name('Step Sensor');
            section.deviceSetting('switchv').capability(['switch']).name('Switch');
            section.deviceSetting('switchLevel').capability(['switchLevel']).name('Switch Level');
            section.deviceSetting('temperatureMeasurement').capability(['temperatureMeasurement']).name('Temperature Measurement');
            section.deviceSetting('thermostat').capability(['thermostat']).name('Thermostat');
            section.deviceSetting('thermostatCoolingSetpoint').capability(['thermostatCoolingSetpoint']).name('Thermostat Cooling Setpoint');
            section.deviceSetting('threeAxis').capability(['threeAxis']).name('Three Axis');
            section.deviceSetting('touchSensor').capability(['touchSensor']).name('TouchSensor');
            section.deviceSetting('valve').capability(['valve']).name('Valve');
            section.deviceSetting('waterSensor').capability(['waterSensor']).name('Water Sensor');

        });


    })

    .updated(async (context, updateData) => {

    })
