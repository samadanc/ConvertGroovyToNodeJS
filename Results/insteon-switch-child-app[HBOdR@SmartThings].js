
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Insteon Switches', section => {
            section.textSetting('deviceName').name('Device Name');
            section.textSetting('deviceID').name('Device ID');
            section.booleanSetting('isDimmable').name('Dimmable');

        });


    })
