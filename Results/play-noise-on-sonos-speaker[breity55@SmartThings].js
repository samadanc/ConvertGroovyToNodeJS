
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When Switch Turns On...', section => {
            section.deviceSetting('switchInput').capability(['switch']).name('What Switch?');

        });


        page.section('['hideable': true, 'hidden': false], 'Play', section => {
            section.enumSetting('actionType').name('What Sound?');
            section.deviceSetting('sonos').capability(['musicPlayer']).name('What Sonos Speaker?');
            section.numberSetting('volume').name('Temporarily Change Volume to What?');

        });


        page.section('['hideable': true, 'hidden': false], 'Additional Options', section => {
            section.booleanSetting('isToggleLights').name('Toggle Lights On and Off?');
            section.deviceSetting('lights').capability(['switch']).name('Turn Off What Light(s)?');

        });


    })
