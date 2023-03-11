
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Allow Simple Control to Monitor and Control These Things...', section => {
            section.deviceSetting('switches').capability(['switch']).name('Which Switches?');
            section.deviceSetting('locks').capability(['lock']).name('Which Locks?');
            section.deviceSetting('thermostats').capability(['thermostat']).name('Which Thermostats?');
            section.deviceSetting('doorControls').capability(['doorControl']).name('Which Door Controls?');
            section.deviceSetting('colorControls').capability(['colorControl']).name('Which Color Controllers?');
            section.deviceSetting('musicPlayers').capability(['musicPlayer']).name('Which Music Players?');
            section.deviceSetting('switchLevels').capability(['switchLevel']).name('Which Adjustable Switches?');

        });


    })
