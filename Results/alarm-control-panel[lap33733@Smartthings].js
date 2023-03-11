
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Control Switch', section => {
            section.deviceSetting('theSwitch').capability(['switch']).name('Select a switch');
            section.numberSetting('secondsLater').name('Arm how many seconds later?');
            section.deviceSetting('siren').capability(['alarm']).name('On this Siren');

        });


        page.section('Options for Arm', section => {
            section.enumSetting('stLanguageOn').name('SmartThings Voice?');
            section.textSetting('messageOn').name('Play this message when switch is activated');
            section.textSetting('messageOnURL').name('Play this sound when switch is activated');
            section.textSetting('messageOnNow').name('Play this message when active');
            section.deviceSetting('sonosOn').capability(['musicPlayer']).name('On this Speaker player');
            section.numberSetting('volumeOn').name('Temporarily change volume');
            section.booleanSetting('sendPushOn').name('Send Push Notification when switch is activated?');
            section.booleanSetting('sendPushOnNow').name('Send Push Notification when alarm is activated?');
            section.booleanSetting('sendSirenOnNow').name('Send Siren Notification when alarm is activated?');

        });


        page.section('Options for disarm', section => {
            section.enumSetting('stLanguageOff').name('SmartThings Voice?');
            section.textSetting('messageOff').name('Play this message');
            section.textSetting('messageOffURL').name('Play this sound when switch is activated');
            section.deviceSetting('sonosOff').capability(['musicPlayer']).name('On this Speaker player');
            section.numberSetting('volumeOff').name('Temporarily change volume');
            section.booleanSetting('sendPushOff').name('Send Push Notification also?');
            section.booleanSetting('sendSirenOffNow').name('Send Siren Notification when alarm is deactivated?');

        });


        page.section('Real Contacts', section => {
            section.deviceSetting('contacts').capability(['contactSensor']).name('');
            section.enumSetting('contactState').name('State');

        });


        page.section('Virtual Contact', section => {
            section.deviceSetting('contact2').capability(['contactSensor']).name('');
            section.numberSetting('secondsLater').name('How many seconds?');

        });


        page.section('Optionaly play a message if SHM armed', section => {
            section.enumSetting('stLanguage').name('SmartThings Voice?');
            section.textSetting('message').name('Play this message');
            section.deviceSetting('sonos').capability(['musicPlayer']).name('On this Speaker player');
            section.numberSetting('volume').name('Temporarily change volume');
            section.booleanSetting('sendSirenArmedNotification').name('Send Siren Notification if alarm is activated?');

        });


    })
