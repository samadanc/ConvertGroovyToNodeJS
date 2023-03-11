
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Which devices should be available?', section => {
            section.deviceSetting('sensor').capability(['sensor']).name('Which sensors?');
            section.deviceSetting('presenceSensor').capability(['presenceSensor']).name('Which presence sensors?');
            section.deviceSetting('actuator').capability(['actuator']).name('Which actuators?');
            section.deviceSetting('switches').capability(['switch']).name('Which switches?');
            section.deviceSetting('colorControl').capability(['colorControl']).name('Which color controls?');
            section.deviceSetting('musicPlayer').capability(['musicPlayer']).name('Which music players?');
            section.deviceSetting('alarm').capability(['alarm']).name('Which alarms?');
            section.deviceSetting('energyMeter').capability(['energyMeter']).name('Which energy meters?');
            section.deviceSetting('indicator').capability(['indicator']).name('Which indicators?');
            section.deviceSetting('powerMeter').capability(['powerMeter']).name('Which power meters?');
            section.deviceSetting('smokeDetector').capability(['smokeDetector']).name('Which smoke detectors?');
            section.deviceSetting('carbonMonoxideDetector').capability(['carbonMonoxideDetector']).name('Which CO detectors?');
            section.deviceSetting('thermostat').capability(['thermostat']).name('Which thermostats?');

        });


    })
