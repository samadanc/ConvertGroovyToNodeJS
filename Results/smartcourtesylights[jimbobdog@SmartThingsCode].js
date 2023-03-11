
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When motion from...', section => {
            section.deviceSetting('sourceMotion').capability(['motionSensor']).name('');

        });


        page.section('Main courtesy switch...', section => {
            section.deviceSetting('targetSwitch').capability(['switch']).name('');
            section.numberSetting('targetSwitchOffAfterMinutes').name('Off after (minutes)?');

        });


        page.section('Optional switches', section => {
            section.deviceSetting('optionalSwitches').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.sourceMotion, 'motionSensor', 'motion.inactive', 'motionInActiveHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.sourceMotion, 'motionSensor', 'motion.active', 'motionActiveHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunset', 'sunSetHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunrise', 'sunRiseHandler')

    })

    .subscribedEventHandler('motionInActiveHandler', (context, event) => {
        
        console.log("${state.appPrefix} motion ceased; autoSwitchOffRequired=${state.autoSwitchOffRequired}")
        if (state.autoSwitchOffRequired) {
        console.log("${state.appPrefix} scheduling switch off in $targetSwitchOffAfterMinutes minute(s)...")
        this.runIn(targetSwitchOffAfterMinutes * 60, switchAllOff)
        }
        

	})

    .subscribedEventHandler('sunSetHandler', (context, event) => {
        
        state.sundown = true
        console.log("${state.appPrefix} sunset! sundown=${state.sundown}")
        

	})

    .subscribedEventHandler('motionActiveHandler', (context, event) => {
        
        let currentSwitchState = targetSwitch.switchState.value
        console.log("${state.appPrefix} motion detected! targetSwitch state: $currentSwitchState")
        this.unschedule()
        if (state.sundown && currentSwitchState == 'off') {
        this.switchAllOn()
        } else {
        console.log("${state.appPrefix} it's either daylight or the switch is already on, switch-off not required!")
        }
        

	})

    .subscribedEventHandler('sunRiseHandler', (context, event) => {
        
        state.sundown = false
        console.log("${state.appPrefix} sunrise! sundown=${state.sundown}")
        

	})
