
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section(''About'', section => {

        });


        page.section('Notify me when the following door(s) or window contact(s) are left open (maximum 30 contacts)...', section => {
            section.deviceSetting('theSensor').capability(['contactSensor']).name('');

        });


        page.section('Notifications', section => {
            section.enumSetting('sendPushMessage').name('Send a push notification?');
            section.numberSetting('frequency').name('Delay between notifications in minutes');
            section.numberSetting('givenMaxNotif').name('Max Number of Notifications');

        });


        page.section('Use Speech capability to warn the residents [optional]', section => {
            section.deviceSetting('theVoice').capability(['speechSynthesis']).name('Announce with these text-to-speech devices (speechSynthesis)');
            section.deviceSetting('theSpeaker').capability(['musicPlayer']).name('Announce with these text-to-speech devices (musicPlayer)');
            section.deviceSetting('powerSwitch').capability(['switch']).name('On/off switch for Voice notifications? [optional]');

        });


        page.section('And, when contact is left open for more than this delay in minutes [default=5 min.]', section => {
            section.numberSetting('maxOpenTime').name('Minutes?');

        });


        page.section('Turn off the thermostat(s) or set them to eco/away after the delay;revert this action when closed [optional]', section => {
            section.deviceSetting('tstats').capability(['thermostat']).name('Which thermostat(s)?');
            section.booleanSetting('awayFlag').name('Set the thermostat(s) to eco/away instead of turning it off  [default= off]?');

        });


        page.section('What do I use as the Master on/off switch to enable/disable other smartapps\' processing? [optional,ex.for zoned heating/cooling solutions]', section => {
            section.deviceSetting('masterSwitch').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

    })
