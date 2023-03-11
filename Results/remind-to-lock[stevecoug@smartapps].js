
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {

        });


        page.section('Remind me when a lock is unlocked', section => {
            section.deviceSetting('lock').capability(['lock']).name('Which lock?');
            section.numberSetting('notifyAfter').name('If unlocked for (minutes)');
            section.numberSetting('repeatEvery').name('Repeat every (minutes)');
            section.numberSetting('repeatLimit').name('But no more than (times)');

        });


        page.section('Notification Options', section => {
            section.booleanSetting('pushMessage').name('Send push message');
            section.deviceSetting('speechDevice').capability(['speechSynthesis']).name('Speak using these devices');
            section.textSetting('customPhrase').name('Utter this phrase');

        });


    })
