
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'routineExecuted', 'changeProgramHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'mode', 'changeProgramHandler')

    })

    .subscribedEventHandler('changeSTHandler', (context, event) => {
        
                this.LOG("changeSTHandler() entered with evt: ${event.name}: ${event.value}", 5)
                if (settings.ctrlProgram.contains(event.value)) {
                    if (!state.ecobeeThatChanged) {
                        state.ecobeeThatChanged = event.displayName
                        state.ecobeeNewProgram = event.value
                    }
                    if (settings.runModeOrRoutine == 'Mode') {
                        this.LOG("Changing Mode to ${settings.runMode} because ${state.ecobeeThatChanged} changed to ${state.ecobeeNewProgram}", 2, null, 'info')
                        if (settings.myThermostats.size() == 1) {
                            this.changeMode()
                        } else {
                            parent.poll()
                            this.runIn(5, changeMode, ['overwrite': true])
                        }
                    } else {
                        this.LOG("Executing Routine ${settings.runAction} because ${state.ecobeeThatChanged} changed to ${state.ecobeeNewProgram}", 2, null, 'info')
                        if (settings.myThermostats.size() == 1) {
                            this.runRoutine()
                        } else {
                            parent.poll()
                            this.runIn(15, runRoutine, ['overwrite': true])
                        }
                    }
                }
            

	})

    .subscribedEventHandler('changeProgramHandler', (context, event) => {
        
                this.LOG("changeProgramHander() entered with evt: ${event.name}: ${event.value}", 5)
                let gotEvent = settings.modeOrRoutine == 'Routine' ? event.displayName?.toLowerCase() : event.value?.toLowerCase()
                this.LOG("Event name received (in lowercase): $gotEvent and current expected: ${state.expectedEvent}", 5)
                if (!(state.expectedEvent*.toLowerCase().contains(gotEvent))) {
                    this.LOG('Received an mode/routine that we aren\'t watching. Nothing to do.', 4)
                    return true
                }
                settings.myThermostats.each({ let stat ->
                    this.LOG("In each loop: Working on stat: $stat", 4, null, 'trace')
                    let thermostatHold = stat.currentValue('thermostatHold')
                    java.lang.Boolean vacationHold = thermostatHold == 'vacation'
                    if (vacationHold) {
                        if (state.doCancelVacation) {
                            stat.cancelVacation()
                            this.sendNotificationEvent("As requested, I cancelled the active Vacation Hold on $stat.")
                            thermostatHold = 'hold'
                            vacationHold = false
                            state.refresh()
                        } else {
                            if (state.doResumeProgram) {
                                this.LOG("Can't Resume Program while in Vacation mode ($stat)", 2, null, 'warn')
                                this.sendNotificationEvent("I was asked to Resume Program on $stat, but it is currently in 'Vacation' Hold so I ignored the request.")
                            } else {
                                this.LOG("Can't change Program while in Vacation mode ($stat)", 2, null, 'warn')
                                this.sendNotificationEvent("I was asked to change $stat to ${state.programParam}, but it is currently in 'Vacation' Hold so I ignored the request.")
                            }
                        }
                    }
                    if (!vacationHold) {
                        if (state.doResumeProgram) {
                            this.LOG("Resuming Program for $stat", 4, null, 'trace')
                            if (thermostatHold == 'hold') {
                                let scheduledProgram = stat.currentValue('scheduledProgram')
                                stat.resumeProgram(true)
                                if (state.fanMinutes != null) {
                                    stat.setFanMinOnTime(state.fanMinutes)
                                }
                                this.sendNotificationEvent("And I resumed the scheduled $scheduledProgram program on $stat.")
                            } else {
                                this.sendNotificationEvent("I was asked to Resume Program on $stat, but there is no Hold currently active.")
                            }
                        } else {
                            if (state.programParam != null) {
                                this.LOG("Setting Thermostat Program to programParam: ${state.programParam} and holdType: ${state.holdTypeParam}", 4, null, 'trace')
                                java.lang.Boolean done = false
                                let currentProgramName = stat.currentValue('currentProgramName')
                                if (thermostatHold == '' && currentProgramName == state.programParam) {
                                    let fanSet = false
                                    if (state.fanMinutes != null) {
                                        stat.setFanMinOnTime(state.fanMinutes)
                                        fanSet = true
                                    }
                                    if (state.fanCommand != null) {
                                        stat."${state.fanCommand}"()
                                        fanSet = true
                                    }
                                    this.sendNotificationEvent("And I verified that $stat is already in the ${state.programParam} program${(fanSet) ?  with the requested fan settings. : .}")
                                    done = true
                                } else {
                                    if (thermostatHold == 'hold' || currentProgramName.startsWith('Hold')) {
                                        if (stat.currentValue('scheduledProgram') == state.programParam) {
                                            stat.resumeProgram(true)
                                            let fanSet = false
                                            if (state.fanMinutes != null) {
                                                stat.setFanMinOnTime(state.fanMinutes)
                                                fanSet = true
                                            }
                                            if (state.fanCommand != null) {
                                                stat."${state.fanCommand}"()
                                                fanSet = true
                                            }
                                            if (this.whatHoldType(stat) == 'nextTransition') {
                                                this.sendNotificationEvent("And I resumed the scheduled ${state.programParam} on $stat${(fanSet) ?  with the requested fan settings. : .}")
                                                done = true
                                            }
                                        } else {
                                            stat.resumeProgram(true)
                                        }
                                    }
                                }
                                if (!done) {
                                    let fanSet = false
                                    if (state.fanMinutes != null) {
                                        stat.setFanMinOnTime(state.fanMinutes)
                                        fanSet = true
                                    }
                                    let sendHoldType = this.whatHoldType(stat)
                                    let sendHoldHours = null
                                    if (sendHoldType.isNumber()) {
                                        sendHoldHours = sendHoldType 
                                        sendHoldType = 'holdHours'
                                    }
                                    stat.setThermostatProgram(state.programParam, sendHoldType, sendHoldHours)
                                    if (state.fanCommand != null) {
                                        stat."${state.fanCommand}"()
                                        fanSet = true
                                    }
                                    String timeStr = ''
                                    switch ( sendHoldType ) {
                                        case 'indefinitely':
                                            timeStr = ' indefinitely'
                                            break
                                        case 'nextTransition':
                                            timeStr = ' until next scheduled program change'
                                            break
                                        case 'holdHours':
                                            timeStr = " for $sendHoldHours hours"
                                            break
                                    }
                                    this.sendNotificationEvent("And I set ${stat.displayName} to Hold: ${state.programParam}$timeStr${(fanSet) ?  with the requested fan settings. : .}")
                                }
                            }
                        }
                    }
                })
                return true
            

	})
