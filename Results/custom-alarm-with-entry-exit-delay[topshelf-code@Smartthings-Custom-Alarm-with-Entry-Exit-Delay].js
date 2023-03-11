
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Selected Devices', section => {
            section.deviceSetting('alarmAwayButton').capability(['switch']).name('The panel button that you will push to start the delayed AWAY arming process.');
            section.deviceSetting('alarmStayButton').capability(['switch']).name('The panel button that you will push to start the STAY arming process.');
            section.deviceSetting('alarmOffButton').capability(['switch']).name('The panel button that you will push to turn OFF the alarm system.');
            section.deviceSetting('frontContactSensor').capability(['contactSensor']).name('Front Contact Sensor');
            section.deviceSetting('backContactSensor').capability(['contactSensor']).name('Back Contact Sensor');
            section.deviceSetting('garageContactSensor').capability(['contactSensor']).name('Garage Contact Sensor');
            section.deviceSetting('primaryMotionSensor').capability(['motionSensor']).name('Primary Motion Sensor');
            section.deviceSetting('primaryIgnitionContactSensor').capability(['contactSensor']).name('Primary contact sensor that triggers the alarm.  This should be the only sensor that SMS looks at.');
            section.deviceSetting('lanNouncer').capability(['speechSynthesis']).name('LanNouncer Panel 1.');
            section.deviceSetting('lanNouncerMuteButton').capability(['switch']).name('Button used to temporarily mute lanNouncer.');
            section.deviceSetting('lanNouncerChimeButton').capability(['switch']).name('Button used to play lanNouncer chime.  Typically used for chime testing.');

        });


    })
