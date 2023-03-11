
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Allow Prempoint to Control & Access These Things...', section => {
            section.deviceSetting('switches').capability(['switch']).name('Which Switches?');
            section.deviceSetting('locks').capability(['lock']).name('Which Locks?');
            section.deviceSetting('garagedoors').capability(['garageDoorControl']).name('Which Garage Doors?');
            section.deviceSetting('cameras').capability(['imageCapture']).name('Which Cameras?');

        });


    })
