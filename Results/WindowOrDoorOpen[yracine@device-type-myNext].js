
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
            section.numberSetting('givenMaxNotif').name('Max Number of Notifications. This option applies only if NO thermostat is provided as input below');

        });


        page.section('Use Speech capability to warn the residents [optional]', section => {
            section.deviceSetting('theVoice').capability(['speechSynthesis']).name('Announce with these text-to-speech devices (speechSynthesis)');
            section.deviceSetting('theSpeaker').capability(['musicPlayer']).name('Announce with these text-to-speech devices (musicPlayer)');
            section.deviceSetting('powerSwitch').capability(['switch']).name('On/off switch for Voice notifications? [optional]');

        });


        page.section('And, when contact is left open for more than this delay in minutes (see input below), turn off the tsat(s) or set them to eco/away. The delay input should be a multiple of the delay between notifications ' + 'as most people want some notifications before shutting down the tstat or setting it to eco/away, ex. 2 minutes delay for contact left open vs. 1 minute delay between notification' + '[min: 1 min, default=5 min. if null or zero values provided]', section => {
            section.numberSetting('maxOpenTime').name('Max Open time in Minutes for the Tstat(s)?');

        });


        page.section('Turn off these thermostat(s) or set them to eco/away after the delay;revert this action when closed [optional]', section => {
            section.deviceSetting('tstats').capability(['thermostat']).name('Which thermostat(s)?');
            section.booleanSetting('awayFlag').name('Set the thermostat(s) to eco/away instead of turning it off  [default= off]?');
            section.numberSetting('delayToRestore').name('Delay in Minutes before restoring the thermostat mode? [optional, default=no delay]');

        });


        page.section('What do I use as the Master on/off switch to enable/disable other smartapps\' processing? [optional,ex.for zoned heating/cooling solutions]', section => {
            section.deviceSetting('masterSwitch').capability(['switch']).name('');

        });


        page.section('What do I use as the on/off switch to enable/disable this smartapp\'s processing? [optional,ex.for physical or virtual buttons]', section => {
            section.deviceSetting('holdSwitch').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.holdSwitch, 'switch', 'switch.off', 'offHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.holdSwitch, 'switch', 'switch.on', 'onHandler')

    })
