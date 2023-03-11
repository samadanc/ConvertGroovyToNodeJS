
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When this switch is double-tapped...', section => {
            section.deviceSetting('master').capability(['switch']).name('Where?');

        });


        page.section('Double tap up change to this mode', section => {

        });


        page.section('Double tap down change to this mode', section => {

        });


        page.section('Notifications', section => {
            section.enumSetting('sendPushMessage').name('Send a push notification?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.master, 'switch', 'switch', 'switchHandler')

    })

    .subscribedEventHandler('switchHandler', (context, event) => {
        
        log.info(event.value)
        
        context.api.devices.sendCommands(context.config.master, 'switch', eventsSince)
    
        it.name == 'switch'
        })
        console.log("${recentStates?.size()} STATES FOUND, LAST AT ${(recentStates) ? recentStates[0].dateCreated : }")
        if (event.isPhysical()) {
        if (event.value == 'on' && this.lastTwoStatesWere('on', recentStates, evt)) {
        console.log('detected two taps, disarming system')
        this.takeUpActions()
        } else {
        if (event.value == 'off' && this.lastTwoStatesWere('off', recentStates, evt)) {
        console.log('detected two taps, arming system')
        this.takeDownActions()
        }
        }
        } else {
        log.trace('Skipping digital on/off event')
        }
        

	})
