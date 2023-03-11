
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When there\'s movement...', section => {
            section.deviceSetting('motion1').capability(['motionSensor']).name('Where?');

        });


        page.section('Only when this door is closed...', section => {
            section.deviceSetting('door').capability(['contactSensor']).name('This door is closed ?');

        });


        page.section('Between these times...', section => {
            section.timeSetting('startTime').name('From what time?');
            section.timeSetting('endTime').name('Until what time?');

        });


        page.section('Notification...', section => {
            section.enumSetting('actionType').name('Action?');
            section.textSetting('message').name('Message');

        });


        page.section('', section => {
            section.deviceSetting('speaker').capability(['musicPlayer']).name('On these Speakers');

        });


        page.section('['hideable': true, 'hidden': true], 'More options', section => {
            section.numberSetting('volume').name('Temporarily change volume');

        });


    })
