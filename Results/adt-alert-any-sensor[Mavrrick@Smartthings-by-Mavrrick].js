
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Monitor these devices for activity when alarm is armed', section => {
            section.numberSetting('alarmtype2').name('What type of alarm do you want to trigger');
            section.deviceSetting('motion').capability(['motionSensor']).name('Motion Sensor?');
            section.deviceSetting('contact').capability(['contactSensor']).name('Door or Window Sensor?');

        });


        page.section('Select your ADT Smart Panel...', section => {
            section.deviceSetting('panel').capability(['battery']).name('ADT Panel?');

        });


        page.section('Action to trigger', section => {
            section.deviceSetting('alarms').capability(['alarm']).name('Which Alarm(s) to trigger when ADT alarm goes off');
            section.numberSetting('alarmtype').name('What type of alarm do you want to trigger');
            section.numberSetting('lightaction').name('What type of light action do you want to trigger');
            section.deviceSetting('switches2').capability(['switch']).name('Turn these lights on if Light action is set to 2 or 4');
            section.deviceSetting('switches').capability(['switch']).name('Flash these lights (optional) If Light action is set to 3 or 4');

        });


        page.section('Camera setup (Optional)', section => {
            section.booleanSetting('recordCameras').name('Enable Camera recording?');
            section.booleanSetting('recordRepeat').name('Enable Camare to trigger recording as long as arlarm is occuring?');
            section.deviceSetting('cameras').capability(['videoCapture']).name('');
            section.numberSetting('clipLength').name('Clip Length');

        });


        page.section('Flashing Lights setup (Optional)', section => {
            section.numberSetting('onFor').name('On for (default 5000)');
            section.numberSetting('offFor').name('Off for (default 5000)');
            section.numberSetting('numFlashes').name('This number of times (default 3)');

        });


        page.section('Via a push notification and/or an SMS message', section => {
            section.textSetting('message').name('Send this message if activity is detected');

        });


        page.section('Via a push notification and/or an SMS message', section => {
            section.enumSetting('pushAndPhone').name('Notify me via Push Notification');

        });


        page.section('Minimum time between messages (optional, defaults to every message)', section => {

        });


    })
