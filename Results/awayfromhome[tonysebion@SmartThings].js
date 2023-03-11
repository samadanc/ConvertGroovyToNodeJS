
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section(''About'', section => {

        });


        page.section('When all of these people leave home', section => {
            section.deviceSetting('people').capability(['presenceSensor']).name('');

        });


        page.section('And there is no motion at home on these sensors [optional]', section => {
            section.deviceSetting('motions').capability(['motionSensor']).name('Where?');

        });


        page.section('Turn off these lights', section => {
            section.deviceSetting('switches').capability(['switch']).name('Switch');

        });


        page.section('And activate the alarm system [optional]', section => {
            section.deviceSetting('alarmSwitch').capability(['contactSensor']).name('Alarm Switch');

        });


        page.section('Set the ecobee thermostat(s)', section => {
            section.deviceSetting('ecobee').capability(['thermostat']).name('Ecobee Thermostat(s)');

        });


        page.section('Heating set Point for the thermostat [default = 60°F/14°C]', section => {

        });


        page.section('Cooling set Point for the thermostat [default = 80°F/27°C]', section => {

        });


        page.section('Or set the ecobee to this Climate Name (ex. Away)', section => {
            section.textSetting('givenClimateName').name('Climate Name');

        });


        page.section('Lock these locks [optional]', section => {
            section.deviceSetting('locks').capability(['lock']).name('Locks?');

        });


        page.section('Arm this(ese) camera(s) [optional]', section => {
            section.deviceSetting('cameras').capability(['imageCapture']).name('Cameras');

        });


        page.section('Trigger these actions when home has been quiet for [default=3 minutes]', section => {
            section.numberSetting('residentsQuietThreshold').name('Time in minutes');

        });


        page.section('Notifications', section => {
            section.enumSetting('sendPushMessage').name('Send a push notification?');

        });


        page.section('Detailed Notifications', section => {

        });


    })
