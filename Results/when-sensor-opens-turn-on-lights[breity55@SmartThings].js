
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When Sensor Opens...', section => {
            section.deviceSetting('sensorInput').capability(['contactSensor']).name('Which Sensor?');

        });


        page.section('Turn On Lights...', section => {
            section.deviceSetting('lightInputs').capability(['switch']).name('Which Light(s)?');

        });


        page.section('Time and Place...', section => {
            section.textSetting('zipCodeInput').name('Zip Code?');
            section.textSetting('sunsetOffsetValueInput').name('Offset sunset by? (HH:MM)');
            section.textSetting('sunriseOffsetValueInput').name('Offset surise by? (HH:MM)');

        });


    })
