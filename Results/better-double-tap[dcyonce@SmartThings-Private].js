
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When this switch is double-tapped...', section => {
            section.deviceSetting('master').capability(['switch']).name('Where?');

        });


        page.section('Window of time for double-tap in seconds (default 10)', section => {

        });


        page.section('Turn on or off all of these switches as well', section => {
            section.deviceSetting('switches').capability(['switch']).name('');

        });


        page.section('And turn off but not on all of these switches', section => {
            section.deviceSetting('offSwitches').capability(['switch']).name('');

        });


        page.section('And turn on but not off all of these switches', section => {
            section.deviceSetting('onSwitches').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.master, 'switch', 'switch', 'switchHandler')

    })

    .subscribedEventHandler('switchHandler', (context, event) => {
        
        log.info(event.value)
        let timing = settings.timing.toInteger
        log.info(timing)
        
        context.api.devices.sendCommands(context.config.master, 'switch', eventsSince)
    
        it.name == 'switch'
        })
        console.log("${recentEvents?.size()} STATES FOUND, LAST AT ${(recentEvents) ? recentEvents[0].dateCreated : }")
        if (event.physical) {
        if (event.value == 'on' && this.lastTwoEventsWere('on', recentEvents, evt)) {
        console.log('detected two taps, turn on other light(s)')
        this.onSwitches()*.on()
        } else {
        if (event.value == 'off' && this.lastTwoEventsWere('off', recentEvents, evt)) {
        console.log('detected two taps, turn off other light(s)')
        this.offSwitches()*.off()
        }
        }
        } else {
        log.trace('Skipping digital on/off event')
        }
        

	})
