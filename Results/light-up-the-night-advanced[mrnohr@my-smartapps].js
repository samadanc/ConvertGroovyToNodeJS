
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Monitor the luminosity...', section => {
            section.deviceSetting('lightSensor').capability(['illuminanceMeasurement']).name('');
            section.numberSetting('turnOnBrightness').name('Turn on under this lux (default 30)');
            section.numberSetting('turnOffBrightness').name('Turn off over this lux (default 50)');

        });


        page.section('Turn on some lights...', section => {
            section.deviceSetting('lights').capability(['switch']).name('');

        });


        page.section('Between these times...', section => {
            section.timeSetting('morningStart').name('Not before...');
            section.timeSetting('eveningEnd').name('Not after...');

        });


        page.section('Do not flip back for this many minutes', section => {
            section.numberSetting('flickerThreshold').name('Minutes (optional)');

        });


        page.section('Notifications for fine tuning', section => {
            section.booleanSetting('debugPush').name('Send notifications for fine tuning?');
            section.enumSetting('pushAndPhone').name('Both Push and SMS?');

        });


    })
