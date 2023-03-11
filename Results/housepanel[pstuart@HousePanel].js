
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Switches...', section => {
            section.deviceSetting('myswitches').capability(['switch']).name('');

        });


        page.section('Bulbs...', section => {
            section.deviceSetting('mybulbs').capability(['bulb']).name('');

        });


        page.section('Dimmer switches...', section => {
            section.deviceSetting('mydimmers').capability(['switchLevel']).name('');

        });


        page.section('Motion sensors...', section => {
            section.deviceSetting('mysensors').capability(['motionSensor']).name('');

        });


        page.section('Contact (door and window) sensors...', section => {
            section.deviceSetting('mydoors').capability(['contactSensor']).name('');

        });


        page.section('Momentary buttons...', section => {
            section.deviceSetting('mymomentaries').capability(['momentary']).name('');

        });


        page.section('Locks...', section => {
            section.deviceSetting('mylocks').capability(['lock']).name('');

        });


        page.section('Music players...', section => {
            section.deviceSetting('mymusics').capability(['musicPlayer']).name('');

        });


        page.section('Thermostats...', section => {
            section.deviceSetting('mythermostats').capability(['thermostat']).name('');

        });


        page.section('Weather...', section => {

        });


        page.section('Presences...', section => {
            section.deviceSetting('mypresences').capability(['presenceSensor']).name('');

        });


        page.section('Water Sensors...', section => {
            section.deviceSetting('mywaters').capability(['waterSensor']).name('');

        });


        page.section('Other Sensors (duplicates ignored)...', section => {
            section.deviceSetting('myothers').capability(['sensor']).name('');

        });


    })
