
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Garage', section => {
            section.deviceSetting('garageDoorOpener').capability(['switch']).name('Garage Door Opener');
            section.deviceSetting('garageLightSwitch').capability(['switch']).name('Garage Light Switches');
            section.deviceSetting('lightSwitch').capability(['switch']).name('Other Light Switches');
            section.deviceSetting('garageDoorContact').capability(['threeAxis']).name('Garage Door Contact');
            section.numberSetting('lightOffDelay').name('Garage Light Off in X Min(s)');

        });


    })

    .updated(async (context, updateData) => {

    })
