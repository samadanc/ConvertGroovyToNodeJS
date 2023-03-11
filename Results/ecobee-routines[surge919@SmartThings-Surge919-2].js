
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
        
                this.LOG("changeProgramHander() entered with evt: ${event.name}: ${event.value}", 5)
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
                        if (stat.currentValue('thermostatHold') == 'hold') {
                            let scheduledProgram = stat.currentValue('scheduledProgram')
                            stat.resumeProgram(true)
                            this.sendNotificationEvent("And I resumed the scheduled $scheduledProgram program on $stat.")
                        }
                    } else {
                        this.LOG("Setting Thermostat Program to programParam: ${state.programParam} and holdType: ${state.holdTypeParam}", 4, null, 'trace')
                        java.lang.Boolean done = false
                        let thermostatHold = stat.currentValue('thermostatHold')
                        if (stat.currentValue('currentProgram') == state.programParam) {
                            if (thermostatHold == '') {
                                this.sendNotificationEvent("And I verified that $stat is already in the ${state.programParam} program.")
                                done = true
                            }
                        } else {
                            if (thermostatHold == 'hold') {
                                if (stat.currentValue('scheduledProgram') == state.programParam) {
                                    if (state.programParam == 'nextTransition') {
                                        stat.resumeProgram(true)
                                        this.sendNotificationEvent("And I resumed the scheduled ${state.programParam} on $stat.")
                                        done = true
                                    }
                                }
                            }
                        }
                        if (!done) {
                            stat.setThermostatProgram(state.programParam, state.holdTypeParam)
                            this.sendNotificationEvent("And I set $stat to the ${state.programParam} program${((state.holdTypeParam != nextTransition)) ?  indefinitely. : .}")
                        }
                    }
                    if (state.fanCommand != '' && state.fanCommand != null) {
                        stat."${state.fanCommand}"()
                    }
                })
                return true
            

	})
