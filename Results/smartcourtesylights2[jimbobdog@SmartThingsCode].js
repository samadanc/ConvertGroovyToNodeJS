
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunset', 'sunSetHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunrise', 'sunRiseHandler')

    })

    .subscribedEventHandler('motionInActiveHandler', (context, event) => {
        
                console.log("${state.appPrefix} motion ceased; autoSwitchOffRequired=${state.autoSwitchOffRequired}")
                if (state.autoSwitchOffRequired) {
                    console.log("${state.appPrefix} scheduling switch off in $targetSwitchOffAfterMinutes minute(s)...")
                    this.runIn(targetSwitchOffAfterMinutes * 60, runOffRoutine)
                }
            

	})

    .subscribedEventHandler('sunSetHandler', (context, event) => {
        
                state.sundown = true
                console.log("${state.appPrefix} sunset! sundown=${state.sundown}")
            

	})

    .subscribedEventHandler('motionActiveHandler', (context, event) => {
        
                let targetCurrentState = targetSwitch.switchState.value
                console.log("${state.appPrefix} motion detected! targetSwitch state: $targetCurrentState")
                this.unschedule()
                if (state.sundown && targetCurrentState == 'off') {
                    this.runOnRoutine()
                } else {
                    console.log("${state.appPrefix} it's either daylight or the switch is already on, switch-off not required!")
                }
            

	})

    .subscribedEventHandler('sunRiseHandler', (context, event) => {
        
                state.sundown = false
                console.log("${state.appPrefix} sunrise! sundown=${state.sundown}")
            

	})
