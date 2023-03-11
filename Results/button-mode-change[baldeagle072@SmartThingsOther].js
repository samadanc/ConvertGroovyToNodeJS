
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When this button is pressed', section => {
            section.deviceSetting('button').capability(['switch']).name('Which?');

        });


        page.section('Change to this mode', section => {

        });


        page.section('Turn off these lights', section => {
            section.deviceSetting('offSwitches').capability(['switch']).name('Which?');

        });


        page.section('Turn on these lights', section => {
            section.deviceSetting('onSwitches').capability(['switch']).name('Which?');

        });


        page.section('Choose thermostat... ', section => {
            section.deviceSetting('thermostat').capability(['thermostat']).name('');

        });


        page.section('Heat setting...', section => {
            section.numberSetting('heatingSetpoint').name('Degrees Fahrenheit?');

        });


        page.section('Notifications', section => {
            section.enumSetting('sendPushMessage').name('Send a push notification?');

        });


    })
