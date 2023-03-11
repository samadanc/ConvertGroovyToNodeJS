
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('''', section => {

        });


        page.section('Switch to enable/disable app', section => {
            section.deviceSetting('enableswitch1').capability(['switch']).name('Control Switch - Optional');

        });


        page.section('', section => {
            section.deviceSetting('alarm').capability(['waterSensor']).name('Water Sensor');
            section.booleanSetting('actionType1').name('Select Water Sensor action type: 
\n 
\n On = \');

        });


        page.section('Turn on this switch when wet/dry', section => {
            section.deviceSetting('switch1').capability(['switch']).name('Switch to control');

        });


        page.section('Logging', section => {
            section.booleanSetting('debugMode').name('Enable logging');

        });


    })
