
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'mode', 'smartScheduleHandler')

        context.api.schedules.runIn('timeHandler', delay);

        context.api.schedules.runEvery5Minutes('pollOn', delay);

    })

    .subscribedEventHandler('eventHandler', (context, event) => {
        
                console.log("Executing 'eventHandler' for ${event.displayName}")
                let msg 
                if (event.value == 'paused') {
                    log.trace("Setting auto dock for ${event.displayName}")
                    if (settings.autoDock) {
                        this.runIn(settings.autoDockDelay, scheduleAutoDock)
                    }
                } else {
                    if (event.value == 'error') {
                        this.unschedule(pollOn)
                        this.unschedule(scheduleAutoDock)
                        this.runEvery5Minutes('pollOn')
                        this.sendEvent(['linkText': app.label, 'name': "${event.displayName}", 'value': 'error', 'descriptionText': "${event.displayName} has an error", 'eventType': 'SOLUTION_EVENT', 'displayed': true])
                        log.trace("${event.displayName} has an error")
                        msg = "${event.displayName} has an error: " + event.device.latestState('statusMsg').stringValue.minus('HAS A PROBLEM - ')
                        if (settings.sendBotvacError) {
                            this.messageHandler(msg, false)
                        }
                    } else {
                        if (event.value == 'cleaning') {
                            this.unschedule(pollOn)
                            this.unschedule(scheduleAutoDock)
                            this.schedule('0 0/1 * * * ?', pollOn)
                            console.log("${event.device.deviceNetworkId} has started cleaning")
                            if (settings["ssIntervalFromMidnight#${event.device.deviceNetworkId}"]) {
                                state.lastClean[event.device.deviceNetworkId] = new Date().clearTime().getTime()
                            } else {
                                state.lastClean[event.device.deviceNetworkId] = this.now()
                            }
                            state.botvacOnTimeMarker[event.device.deviceNetworkId] = this.now()
                            console.log("${event.device.deviceNetworkId} has started cleaning")
                            if (settings.forceClean) {
                                state.forceCleanNotificationSent[event.device.deviceNetworkId] = false
                            }
                            state.smartSchedule[event.device.deviceNetworkId] = false
                            this.sendEvent(['linkText': app.label, 'name': "${event.displayName}", 'value': 'on', 'descriptionText': "${event.displayName} is on", 'eventType': 'SOLUTION_EVENT', 'displayed': true])
                            msg = "${event.displayName} is on"
                            if (settings.sendBotvacOn) {
                                this.messageHandler(msg, false)
                            }
                            this.setSHMToStay()
                        } else {
                            if (event.value == 'full') {
                                this.unschedule(pollOn)
                                this.runEvery5Minutes('pollOn')
                                this.sendEvent(['linkText': app.label, 'name': "${event.displayName}", 'value': 'bin full', 'descriptionText': "${event.displayName} bin is full", 'eventType': 'SOLUTION_EVENT', 'displayed': true])
                                log.trace("${event.displayName} bin is full")
                                msg = "${event.displayName} bin is full"
                                if (settings.sendBotvacBin) {
                                    this.messageHandler(msg, false)
                                }
                            } else {
                                if (event.value == 'ready') {
                                    this.unschedule(pollOn)
                                    this.unschedule(scheduleAutoDock)
                                    this.runEvery5Minutes('pollOn')
                                    this.sendEvent(['linkText': app.label, 'name': "${event.displayName}", 'value': 'off', 'descriptionText': "${event.displayName} is off", 'eventType': 'SOLUTION_EVENT', 'displayed': true])
                                    log.trace("${event.displayName} is off")
                                    msg = "${event.displayName} is off"
                                    if (settings.sendBotvacOff) {
                                        this.messageHandler(msg, false)
                                    }
                                }
                            }
                        }
                    }
                }
            

	})

    .subscribedEventHandler('smartScheduleHandler', (context, event) => {
        
                if (evt != null) {
                    console.log("Executing 'smartScheduleHandler' for ${event.displayName}")
                } else {
                    console.log('Executing \'smartScheduleHandler\' for scheduled event')
                }
                this.runIn(this.getNextTimeInSeconds(), timeHandler)
                this.getChildDevices().each({ let childDevice ->
                    let botvacId = childDevice.deviceNetworkId
                    if (evt != null && event.name == 'switch') {
                        let switchInList = false
                        for (let switchName : settings["ssOverrideSwitch#$botvacId"].name) {
                            if (switchName == event.device.name) {
                                switchInList = true
                                break
                            }
                        }
                        console.log("Swtich found in override switch list: $switchInList")
                        if (switchInList) {
                            let executeOverride = true
                            if (settings["ssOverrideSwitchCondition#$botvacId"] == 'all') {
                                for (let switchVal : settings["ssOverrideSwitch#$botvacId"].currentSwitch) {
                                    if (switchVal == 'off') {
                                        executeOverride = false
                                        break
                                    }
                                }
                            }
                            if (executeOverride) {
                                this.resetSmartScheduleForDevice(botvacId)
                                childDevice.poll()
                            }
                            if (settings.ssNotification) {
                                this.messageHandler("Neato SmartSchedule has reset schedule for ${childDevice.name} as override switch ${event.displayName} is on.", false)
                            }
                        }
                    }
                    if (settings["ssScheduleTrigger#$botvacId"] != 'none') {
                        let delay = 0
                        if (settings["ssStartDelay#$botvacId"]) {
                            delay = settings["ssStartDelay#$botvacId"] * 60
                        }
                        if (delay > 0) {
                            this.runIn(delay, startConditionalClean, ['data': ['botvacId': botvacId ], 'overwrite': false])
                        } else {
                            this.startConditionalClean(['botvacId': botvacId ])
                        }
                    }
                })
            

	})

    .scheduledEventHandler('timeHandler', (context, event) => {
        
                this.smartScheduleHandler(evt)
            

	})

    .scheduledEventHandler('pollOn', (context, event) => {
        
                console.log('Executing \'pollOn\'')
                let activeCleaners = false
                console.log("Last clean states: ${state.lastClean}")
                console.log("Smart schedule states: ${state.smartSchedule}")
                console.log("Botvac ON time markers: ${state.botvacOnTimeMarker}")
                this.getChildDevices().each({ let childDevice ->
                    let botvacId = childDevice.deviceNetworkId
                    state.pollState = this.now()
                    childDevice.poll()
                    if (childDevice.currentSwitch == 'off') {
                        if (settings["smartScheduleEnabled#$botvacId"] && state.lastClean != null && state.lastClean[ botvacId ] != null) {
                            let t = this.now() - state.lastClean[ botvacId ]
                            console.log("${childDevice.displayName} schedule marker at " + state.lastClean[ botvacId ] + ". ${(t / 86400000)} days has elapsed since. ${(settings[ssCleaningInterval#$botvacId] - (t / 86400000))} days to scheduled clean.")
                            if (settings["ssScheduleTrigger#$botvacId"] == 'none' && settings["ssCleaningInterval#$botvacId"] - t / 86400000 < 1 && !(state.smartSchedule[ botvacId ]) && settings["ssEnableWarning#$botvacId"]) {
                                state.smartSchedule[ botvacId ] = true
                                if (settings.ssNotification) {
                                    this.messageHandler("Neato SmartSchedule has scheduled ${childDevice.displayName} for a clean in 24 hours (date and time restrictions permitting). Please clear obstacles and leave internal doors open ready for the clean.", false)
                                }
                            } else {
                                if (!(this.getTriggerConditionsOk(botvacId)) && t > settings["ssCleaningInterval#$botvacId"] * 86400000 && !(state.smartSchedule[ botvacId ]) && settings["ssEnableWarning#$botvacId"]) {
                                    state.smartSchedule[ botvacId ] = true
                                    if (settings.ssNotification) {
                                        let reason = 'you\'re next away'
                                        if (settings["ssScheduleTrigger#$botvacId"] == 'switch') {
                                            reason = 'your selected switches turn on'
                                        } else {
                                            if (settings["ssScheduleTrigger#$botvacId"] == 'presence') {
                                                reason = 'your selected presence sensors leave'
                                            }
                                        }
                                        this.messageHandler("Neato SmartSchedule has scheduled ${childDevice.displayName} for a clean when " + reason + ' (date and time restrictions permitting). Please clear obstacles and leave internal doors open ready for the clean.', false)
                                    }
                                }
                            }
                            if (settings["ssScheduleTrigger#$botvacId"] == 'none' && state.smartSchedule[ botvacId ] || !(settings["ssEnableWarning#$botvacId"]) && t > settings["ssCleaningInterval#$botvacId"] * 86400000) {
                                this.startConditionalClean(['botvacId': botvacId ])
                            }
                        }
                        if (settings.forceClean && state.botvacOnTimeMarker != null && state.botvacOnTimeMarker[ botvacId ] != null) {
                            let t = this.now() - state.botvacOnTimeMarker[ botvacId ]
                            console.log("${childDevice.displayName} ON time marker at " + state.botvacOnTimeMarker[ botvacId ] + ". ${(t / 86400000)} days has elapsed since. ${(settings.forceCleanDelay - (t / 86400000))} days to force clean.")
                            if (state.forceCleanNotificationSent != null && !(state.forceCleanNotificationSent[ botvacId ]) && settings.forceCleanDelay - t / 86400000 < 1) {
                                console.log('Force clean due within 24 hours')
                                this.messageHandler(childDevice.displayName + ' has not cleaned for ' + settings.forceCleanDelay - 1 + ' days. Forcing a clean in 24 hours. Please clear obstacles and leave internal doors open ready for the clean.', true)
                                state.forceCleanNotificationSent[ botvacId ] = true
                            }
                            if (t > settings.forceCleanDelay * 86400000) {
                                console.log("Force clean activated as ${(t / 86400000)} days has elapsed")
                                this.messageHandler(childDevice.displayName + ' has not cleaned for ' + settings.forceCleanDelay + ' days. Forcing a clean.', true)
                                this.resetSmartScheduleForDevice(botvacId)
                                childDevice.on()
                            }
                        }
                    }
                    if (childDevice.currentStatus == 'cleaning') {
                        activeCleaners = true
                    }
                })
                if (activeCleaners) {
                    this.setSHMToStay()
                } else {
                    this.setSHMToAway()
                }
                if (location.currentState('alarmSystemStatus')?.value == 'off') {
                    state.autoSHMchange = 'n'
                }
            

	})
