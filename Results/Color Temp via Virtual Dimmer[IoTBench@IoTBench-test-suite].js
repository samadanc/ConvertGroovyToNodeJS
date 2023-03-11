
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Create Virtual Dimmer Switch to be used as a dimmer when you want color temp adjustments', section => {
            section.textSetting('switchLabel').name('Virtual Dimmer Label');

        });


        page.section('Choose your Color Temp bulbs', section => {
            section.deviceSetting('cLights').capability(['color temperature']).name('Select Color Temp Lights');

        });


    })
