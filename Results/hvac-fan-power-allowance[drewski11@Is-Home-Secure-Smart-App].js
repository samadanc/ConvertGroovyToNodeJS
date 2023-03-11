
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When the thermostat fan turns on...', section => {
            section.deviceSetting('thermostat').capability(['thermostat']).name('');
            section.enumSetting('honeywell').name('Is this a Honeywell Wifi Thermostat?');

        });


        page.section('Turn it off how many minutes later?', section => {
            section.numberSetting('minutesLater').name('When?');

        });


        page.section('Don\'t mess with the fan if and doors/windows are open though...', section => {
            section.deviceSetting('doors').capability(['contactSensor']).name('Which?');

        });


        page.section(''Settings'', section => {

        });


        page.section('More options', section => {
            section.enumSetting('days').name('Only on certain days of the week');

        });


    })
