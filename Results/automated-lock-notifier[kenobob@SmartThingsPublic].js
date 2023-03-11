
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {
            section.numberSetting('secondsDelay').name('Number of Seconds you want to Delay to let the lock... lock.');

        });


        page.section('', section => {
            section.deviceSetting('doorLock').capability(['lock']).name('The Lock to Control');

        });


        page.section('Notifications', section => {
            section.enumSetting('sendPushMessage').name('Send a push notification?');
            section.textSetting('notificationText').name('What would you like your notification to say?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'mode', 'modeChangeEventHandler')

    })

    .subscribedEventHandler('modeChangeEventHandler', (context, event) => {
        
        this.logtrace('Executing \'modeChangeEventHandler\'')
        this.logtrace(evt)
        if (event.isStateChange()) {
        let currentMode = location.currentMode
        if
        this.runIn(secondsDelay, checkIfDoorLocked, ['overwrite': true])
        state.schedulerActive = true
        this.logdebug('checkIfDoorLocked Scheduled')
        } else {
        state.schedulerActive = false
        this.unschedulecheckIfDoorLocked()
        }
        }
        this.logtrace('End Executing \'lockChangeEventHandler\'')
        

	})
