
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When this switch is double-tapped OFF...', section => {
            section.deviceSetting('master').capability(['switch']).name('');

        });


        page.section('Turn it on for this many minutes...', section => {
            section.numberSetting('duration').name('');

        });


        page.section('Notification method', section => {
            section.booleanSetting('sendPushMessage').name('Send a push notification?');

        });


        page.section('More Options', section => {
            section.textSetting('customName').name('Assign a name');
            section.enumSetting('days').name('Only on certain days of the week');

        });


        page.section('', section => {
            section.timeSetting('starting').name('Starting');
            section.timeSetting('ending').name('Ending');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.master, 'switch', 'switch', 'switchHandler')

    })

    .subscribedEventHandler('switchHandler', (context, event) => {
        
        log.info(event.value)
        if (allOk) {
        
        context.api.devices.sendCommands(context.config.master, 'switch', eventsSince)
    
        it.name == 'switch'
        })
        console.log("${recentStates?.size()} STATES FOUND, LAST AT ${(recentStates) ? recentStates[0].dateCreated : }")
        if (event.isPhysical()) {
        if (event.value == 'on') {
        this.unschedule()
        } else {
        if (event.value == 'off' && this.lastTwoStatesWere('off', recentStates, evt)) {
        console.log("detected two OFF taps, turning the light ON for $duration minutes")
        
        context.api.devices.sendCommands(context.config.master, 'switch', on)
    
        this.runIn(duration * 60, switchOff)
        let message = "${master.label} turned on for $duration minutes"
        this.send(message)
        }
        }
        } else {
        log.trace('Skipping digital on/off event')
        }
        }
        

	})
