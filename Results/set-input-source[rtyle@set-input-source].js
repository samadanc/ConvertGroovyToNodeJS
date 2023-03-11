
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Targets', section => {
            section.deviceSetting('switchTargets').capability(['switch']).name('Switch targets (turned on when triggered)');
            section.booleanSetting('turnOffToo').name('Turn off too');
            section.deviceSetting('mediaInputSourceTargets').capability(['mediaInputSource']).name('Media input source targets (set when triggered)');
            section.textSetting('inputSource').name('Input source');

        });


        page.section('Triggers', section => {
            section.deviceSetting('switchTriggers').capability(['switch']).name('Switch triggers (when turned on)');
            section.deviceSetting('contactSensorTriggers').capability(['contactSensor']).name('Contact Sensor triggers (when closed)');
            section.deviceSetting('mediaPlaybackTriggers').capability(['mediaPlayback']).name('Media Playback triggers (when starts playing)');

        });


    })
