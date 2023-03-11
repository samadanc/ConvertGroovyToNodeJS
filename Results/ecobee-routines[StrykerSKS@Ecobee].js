
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'mode', 'changeProgramHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'routineExecuted', 'changeProgramHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunrise', 'changeProgramHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunset', 'changeProgramHandler')

    })

    .subscribedEventHandler('changeProgramHandler', (context, event) => {
        
                this.LOG("changeProgramHander() entered with evt: $evt", 5)
                let gotEvent 
                if (settings.modeOrRoutine == 'Routine') {
                    gotEvent = event.displayName?.toLowerCase()
                } else {
                    gotEvent = event.value?.toLowerCase()
                }
                this.LOG("Event name received (in lowercase): $gotEvent  and current expected: ${state.expectedEvent}", 5)
                if (!(state.expectedEvent*.toLowerCase().contains(gotEvent))) {
                    this.LOG('Received an mode/routine that we aren\'t watching. Nothing to do.', 4)
                    return true
                }
                settings.myThermostats.each({ let stat ->
                    this.LOG("In each loop: Working on stat: $stat", 4, null, 'trace')
                    if (state.doResumeProgram == true) {
                        this.LOG("Resuming Program for $stat", 4, null, 'trace')
                        stat.resumeProgram()
                    } else {
                        this.LOG("Setting Thermostat Program to programParam: ${state.programParam} and holdType: ${state.holdTypeParam}", 4, null, 'trace')
                        stat.setThermostatProgram(state.programParam, state.holdTypeParam)
                    }
                    if (state.fanCommand != '' && state.fanCommand != null) {
                        stat."${state.fanCommand}"()
                    }
                })
                return true
            

	})
