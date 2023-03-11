
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section(''Info'', section => {

        });


        page.section('Dimmer', section => {
            section.deviceSetting('dimmer').capability(['switchLevel']).name('Which dimmer switch?');
            section.numberSetting('sceneNumber').name('How many Scenes Do You Need?');
            section.booleanSetting('defaultOption').name('Default to Scene 1 When Switched On?');

        });


        page.section('Bulb Selection', section => {
            section.deviceSetting('hues').capability(['colorControl']).name('Which Hue Bulbs?');

        });


    })
