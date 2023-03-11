
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Sensors detecting an intruder', section => {
            section.deviceSetting('intrusionMotions').capability(['motionSensor']).name('Motion Sensors');
            section.deviceSetting('intrusionContacts').capability(['contactSensor']).name('Contact Sensors');

        });


        page.section('Sensors detecting residents', section => {
            section.deviceSetting('residentMotions').capability(['motionSensor']).name('Motion Sensors');

        });


        page.section('Alarm settings and actions', section => {
            section.deviceSetting('alarms').capability(['alarm']).name('Which Alarm(s)');
            section.textSetting('silent').name('Silent alarm only (Yes/No)');
            section.numberSetting('seconds').name('Delay in seconds before siren sounds');
            section.deviceSetting('lights').capability(['switch']).name('Flash these lights (optional)');

        });


        page.section('Notify others (optional)', section => {
            section.textSetting('textMessage').name('Send this message');
            section.textSetting('phone').name('To this phone');

        });


        page.section('Arm system when residents quiet for (default 3 minutes)', section => {
            section.numberSetting('residentsQuietThreshold').name('Time in minutes');

        });


    })
