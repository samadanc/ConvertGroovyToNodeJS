
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When changing to this mode', section => {

        });


        page.section('Set these thermostats to Home/Away mode', section => {
            section.deviceSetting('thermostats').capability(['thermostat']).name('Thermostat(s)?');
            section.enumSetting('thermode').name('Home or Away?');

        });


        page.section('Turn these switches On or Off', section => {
            section.deviceSetting('onSwitches').capability(['switch']).name('Switches to Turn On');
            section.deviceSetting('offSwitches').capability(['switch']).name('Switches to Turn Off');

        });


    })

    .updated(async (context, updateData) => {

    })
