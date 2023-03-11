
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Turn on when there\'s movement...', section => {
            section.deviceSetting('motion').capability(['motionSensor']).name('Where?');

        });


        page.section('And off when there\'s been no movement for...', section => {
            section.numberSetting('minutes').name('Minutes?');

        });


        page.section('Turn on/off light(s)...', section => {
            section.deviceSetting('switches').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.motion, 'motionSensor', 'motion', 'motionHandler')

    })

    .subscribedEventHandler('motionHandler', (context, event) => {
        
        state.debugEnabled = false
        this.DebugLog("LCM: ${event.displayName}: ${event.value}")
        if (event.value == 'active') {
        state.inactivecount = 0
        switches.each({
        if (it.currentState('switch').value == 'off') {
        this.DebugLog("LCM: ${it.displayName}, turning ON due to motion at ${event.displayName}")
        
        context.api.devices.sendCommands(context.config.switches, 'switch', on)
    
        } else {
        this.DebugLog("LCM: ${it.displayName}, light is already on.")
        }
        })
        } else {
        if (event.value == 'inactive') {
        state.active = false
        motion.each({
        if (it.currentState('motion').value == 'active') {
        state.active = true
        }
        })
        if (state.active == false) {
        this.DebugLog('All motions inactive in target area, rechecking in 1 minute')
        this.runIn(60, scheduleCheck, ['overwrite': true])
        } else {
        this.DebugLog('Other motions active in target area, ignoring inactive motion event')
        }
        }
        }
        

	})
