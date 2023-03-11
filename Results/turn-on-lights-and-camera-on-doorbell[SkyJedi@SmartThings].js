
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Doorbell Pushed', section => {
            section.deviceSetting('mySwitch').capability(['switch']).name('Doorbell Pushed');

        });


        page.section('Cameras and Lights settings and actions', section => {
            section.deviceSetting('camera').capability(['imageCapture']).name('Which Camera to take pictures');
            section.deviceSetting('cameraon').capability(['switch']).name('Turn on these Camera Motion Detectors');
            section.deviceSetting('colorson').capability(['colorControl']).name('Turn on these lights');
            section.deviceSetting('switcheson').capability(['switch']).name('Turn on these switches');

        });


        page.section('Choose light effects...', section => {
            section.enumSetting('color').name('Bulb Color?');
            section.enumSetting('lightLevel').name('Light Level?');

        });


        page.section('Turn devices off after X minutes', section => {
            section.numberSetting('timeOff').name('Minutes?');

        });


        page.section('Notifications', section => {
            section.textSetting('textMessage').name('Send this message (optional)');

        });


        page.section(''Change Name of App (optional)'', section => {

        });


    })
