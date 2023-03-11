
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('''', section => {

        });


        page.section('Switch to enable/disable app', section => {
            section.deviceSetting('enableswitch1').capability(['switch']).name('SmartApp Control Switch - Optional');

        });


        page.section('', section => {
            section.deviceSetting('alarm').capability(['waterSensor']).name('Water Sensor');

        });


        page.section('Turn On/Off this switch ', section => {
            section.deviceSetting('switch1').capability(['switch']).name('Switch to control');
            section.enumSetting('trigger').name('Select Actions');
            section.numberSetting('msgDelay').name('Delay between actions (Enter 0 for no delay)');

        });


        page.section('Logging', section => {
            section.booleanSetting('debugMode').name('Enable logging');

        });


    })
