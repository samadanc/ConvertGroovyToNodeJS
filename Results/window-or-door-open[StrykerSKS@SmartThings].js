
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section(''About'', section => {

        });


        page.section('Notify me when the following door or window contact is left open...', section => {
            section.deviceSetting('theSensor').capability(['contactSensor']).name('');

        });


        page.section('Notifications', section => {
            section.enumSetting('sendPushMessage').name('Send a push notification?');

        });


        page.section('Delay between notifications [default=1 minute]', section => {
            section.numberSetting('frequency').name('Number of minutes');

        });


        page.section('Maximum number of notifications [default=5]', section => {
            section.numberSetting('givenMaxNotif').name('Max Number of Notifications');

        });


        page.section('Use Speech capability to warn the residents [optional]', section => {
            section.deviceSetting('theVoice').capability(['speechSynthesis']).name('');

        });


        page.section('What do I use as the Master on/off switch for voice notifications? [optional]', section => {
            section.deviceSetting('powerSwitch').capability(['switch']).name('');

        });


        page.section('And, when contact is left open for more than this delay in minutes [default=5 min.]', section => {
            section.numberSetting('maxOpenTime').name('Minutes?');

        });


        page.section('Turn off the thermostat(s) after the delay;revert this action when closed [optional]', section => {
            section.deviceSetting('tstats').capability(['thermostat']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.theSensor, 'contactSensor', 'contact.open', 'sensorTriggered')

        await context.api.subscriptions.subscribeToDevices(context.config.theSensor, 'contactSensor', 'contact.closed', 'sensorTriggered')

    })

    .subscribedEventHandler('sensorTriggered', (context, event) => {
        
        let freq = frequency ? frequency * 60 : 60
        let max_open_time_in_min = maxOpenTime ? maxOpenTime : 5
        if (event.value == 'closed') {
        let openMinutesCount = state.count * freq / 60
        if (tstats && openMinutesCount > max_open_time_in_min ) {
        this.restore_tstats_mode()
        }
        let msg = "your $theSensor is now closed"
        this.send("WindowOrDoorOpen>$msg")
        if (theVoice && powerSwitch?.currentSwitch == 'on') {
        
        context.api.devices.sendCommands(context.config.theVoice, 'speechSynthesis', setLevel)
    
        
        context.api.devices.sendCommands(context.config.theVoice, 'speechSynthesis', speak)
    
        }
        this.clearStatus()
        } else {
        if (event.value == 'open' && state.status != 'scheduled') {
        this.save_tstats_mode()
        this.runIn(freq, takeAction, ['overwrite': false])
        state.status = 'scheduled'
        console.log("$theSensor will be checked every ${(freq / 60)} minute(s)")
        }
        }
        

	})
