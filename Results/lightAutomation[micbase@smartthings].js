
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'routineExecuted', 'routineChanged')

    })

    .subscribedEventHandler('illuminanceHandler', (context, event) => {
        
                let lastState = state.dark
                if (event.integerValue > luxLevel != null && luxLevel != '' ? luxLevel : 20) {
                    state.dark = false
                } else {
                    state.dark = true
                }
                if (lastState != state.dark) {
                    console.log("dark changed to: ${state.dark}")
                    this.process()
                }
            

	})

    .subscribedEventHandler('motionHandler', (context, event) => {
        
                let lastState = state.motion
                if (event.value == 'active') {
                    state.motion = true
                } else {
                    if (event.value == 'inactive') {
                        state.motion = false
                    }
                }
                if (lastState != state.motion) {
                    console.log("motion changed to: ${state.motion}")
                    this.process()
                }
            

	})

    .subscribedEventHandler('routineChanged', (context, event) => {
        
                let lastState = state.mode
                if (event.displayName == goodMorningRoutine ) {
                    state.mode = 'normal'
                } else {
                    if (event.displayName == goodNightRoutine ) {
                        state.mode = 'sleep'
                    } else {
                        if (event.displayName == movieTimeRoutine ) {
                            state.mode = 'movie'
                        } else {
                            if (event.displayName == manualRoutine ) {
                                state.mode = 'manual'
                            }
                        }
                    }
                }
                if (lastState != state.mode) {
                    console.log("mode changed to: ${state.mode}")
                    this.process()
                }
            

	})
