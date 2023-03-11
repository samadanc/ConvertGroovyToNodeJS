
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Room Settings', section => {
            section.deviceSetting('harmonyScenes').capability(['switch']).name('Select all viewing scenes (ex: Harmony activities).');
            section.deviceSetting('theaterMotion').capability(['motionSensor']).name('Motion sensors to represent theater occupancy.');
            section.deviceSetting('movieSwitch').capability(['switch']).name('Assign a switch to represent movie watching mode. A virtual switch is recommended.');
            section.deviceSetting('partySwitch').capability(['switch']).name('Assign a switch to represent party mode. A virtual switch is recommend.');
            section.deviceSetting('defaultLights').capability(['light']).name('Lights used for Default lighting mode.');
            section.deviceSetting('movieLights').capability(['light']).name('Lights used for Movie lighting mode.');
            section.deviceSetting('partyLights').capability(['light']).name('Lights used for Party lighting mode.');

        });


        page.section('Light Settings', section => {
            section.numberSetting('lightAutoOffThreshold').name('Turn of theater lights after inactivty.');

        });


        page.section('Send this message (optional, sends standard status message if not specified)', section => {
            section.textSetting('messageText').name('Message Text');

        });


        page.section('Via a push notification and/or an SMS message', section => {
            section.enumSetting('pushAndPhone').name('Notify me via Push Notification');

        });


        page.section('Minimum time between messages (optional, defaults to every message)', section => {

        });


    })
