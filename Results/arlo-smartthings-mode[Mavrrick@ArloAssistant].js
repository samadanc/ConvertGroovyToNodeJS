
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'mode', 'modeTriggerEvt')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunriseTime', 'sunriseStopTimeHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'securitySystemStatus', 'modeTriggerEvt')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'alarmSystemStatus', 'modeTriggerEvt')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunriseTime', 'sunriseTimeHandler')

        context.api.schedules.schedule('timeModeTrigger', delay);

        context.api.schedules.schedule('modeNowDeactivate', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunsetTime', 'sunsetTimeHandler')

        context.api.schedules.runIn('initialize', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunsetTime', 'sunsetStopTimeHandler')

    })

    .subscribedEventHandler('sunsetTimeHandler', (context, event) => {
        
                this.sunsetTurnOn(event.value)
            

	})

    .subscribedEventHandler('sunriseTimeHandler', (context, event) => {
        
                this.sunriseTurnOn(event.value)
            

	})

    .subscribedEventHandler('sunsetStopTimeHandler', (context, event) => {
        
                this.sunsetTurnOff(event.value)
            

	})

    .subscribedEventHandler('modeTriggerEvt', (context, event) => {
        
                console.log("${event.device} has generated a ${event.name} event with status of ${event.value}. Checking to see if in mode for this Smartapp")
                if (stmode && shmUseState ) {
                    let curMode = location.currentMode
                    if (stmode =~ curMode ) {
                        let alarmState = location.currentState('alarmSystemStatus')?.value
                        if (alarmState == 'stay' && alarmtype1 == 1) {
                            console.log("Current alarm mode: $alarmState.Current SHM Smartthings alarm mode has been validated. Executing Action.")
                            this.modeNowActive()
                        } else {
                            if (alarmState == 'away' && alarmtype1 == 2) {
                                console.log("Current alarm mode: $alarmState.Current SHM Smartthings alarm mode has been validated. Executing Action.")
                                this.modeNowActive()
                            } else {
                                if (alarmState == 'off' && alarmtype1 == 3) {
                                    console.log("Current alarm mode: $alarmState.Current SHM Smartthings alarm mode has been validated. Executing Action.")
                                    this.modeNowActive()
                                } else {
                                    console.log('Alarm mode did not match with mode. This action does not apply to this mode')
                                    this.unsubscribe()
                                    this.runIn(5, initialize)
                                }
                            }
                        }
                    } else {
                        console.log('Smartthings mode did not validate. This action does not apply to this mode')
                        this.unsubscribe()
                        this.runIn(5, initialize)
                    }
                } else {
                    if (stmode && adtUseState ) {
                        let curMode = location.currentMode
                        console.log('Identified as using Smarthings mode and ADT Alarm Panel')
                        if (stmode =~ curMode ) {
                            let alarmState = panel.currentSecuritySystemStatus
                            if (alarmState == 'armedStay' && alarmtype2 == 1) {
                                console.log("Current alarm mode: $alarmState.Current ADT Smartthings alarm mode has been validated. Executing Action.")
                                this.modeNowActive()
                            } else {
                                if (alarmState == 'armedAway' && alarmtype2 == 2) {
                                    console.log("Current alarm mode: $alarmState.Current ADT Smartthings alarm mode has been validated. Executing Action.")
                                    this.modeNowActive()
                                } else {
                                    if (alarmState == 'disarmed' && alarmtype2 == 3) {
                                        console.log("Current alarm mode: $alarmState.Current ADT Smartthings alarm mode has been validated. Executing Action.")
                                        this.modeNowActive()
                                    } else {
                                        console.log('Alarm mode did not match with mode. This action does not apply to this mode')
                                        this.unsubscribe()
                                        this.runIn(5, initialize)
                                    }
                                }
                            }
                        } else {
                            console.log('Smartthings mode did not validate. This action does not apply to this mode')
                            this.unsubscribe()
                            this.runIn(5, initialize)
                        }
                    } else {
                        if (shmUseState) {
                            let alarmState = location.currentState('alarmSystemStatus')?.value
                            console.log('Identified to use ADT Alarm Mode. Checking what alarm mode is active')
                            if (alarmState == 'stay' && alarmtype1 == 1) {
                                console.log("Current alarm mode: $alarmState.Current SHM Smartthings alarm mode has been validated. Executing Action.")
                                this.modeNowActive()
                            } else {
                                if (alarmState == 'away' && alarmtype1 == 2) {
                                    console.log("Current alarm mode: $alarmState.Current SHM Smartthings alarm mode has been validated. Executing Action.")
                                    this.modeNowActive()
                                } else {
                                    if (alarmState == 'off' && alarmtype1 == 3) {
                                        console.log("Current alarm mode: $alarmState.Current SHM Smartthings alarm mode has been validated. Executing Action.")
                                        this.modeNowActive()
                                    } else {
                                        console.log("Current alarm mode: $alarmState. Current alarm setup value: $alarmtype1. This is not a valid match. Mode will not execute")
                                        this.unsubscribe()
                                        this.runIn(5, initialize)
                                    }
                                }
                            }
                        } else {
                            if (adtUseState) {
                                let alarmState = panel.currentSecuritySystemStatus
                                console.log('Identified to use ADT Alarm Mode. Checking what alarm mode is active')
                                if (alarmState == 'armedStay' && alarmtype2 == 1) {
                                    console.log("Current alarm mode: $alarmState.Current ADT Smartthings alarm mode has been validated. Executing Action.")
                                    this.modeNowActive()
                                } else {
                                    if (alarmState == 'armedAway' && alarmtype2 == 2) {
                                        console.log("Current alarm mode: $alarmState.Current ADT Smartthings alarm mode has been validated. Executing Action.")
                                        this.modeNowActive()
                                    } else {
                                        if (alarmState == 'disarmed' && alarmtype2 == 3) {
                                            console.log("Current alarm mode: $alarmState.Current ADT Smartthings alarm mode has been validated. Executing Action.")
                                            this.modeNowActive()
                                        } else {
                                            console.log("Current alarm mode: $alarmState. Current alarm setup value: $alarmtype2. This is not a valid match. Mode will not execute")
                                            this.unsubscribe()
                                            this.runIn(5, initialize)
                                        }
                                    }
                                }
                            } else {
                                if (stmode) {
                                    let curMode = location.currentMode
                                    console.log("These modes were configured and are $stmode are being reviewed.")
                                    if (stmode =~ curMode ) {
                                        this.modeNowActive()
                                        console.log('mode is active')
                                    } else {
                                        console.log("No longer in proper ST Mode for integration reseting app. Smartthing modes is  $curMode does not match $stmode.")
                                        this.unsubscribe()
                                        this.runIn(5, initialize)
                                    }
                                } else {
                                    if (virtualSwitch) {
                                        let check = virtualSwitch.currentSwitch
                                        if (check != 'off') {
                                            console.log('Virtual Switch mode validation has been validated. Executing Action')
                                            this.modeNowActive()
                                        } else {
                                            console.log('Virtual swtich is off and not in proper state for mode')
                                            this.unsubscribe()
                                            this.runIn(5, initialize)
                                        }
                                    } else {
                                        if (generalRule) {
                                            console.log('No Mode critera defined. Running actions')
                                            this.modeNowActive()
                                        } else {
                                            console.log('Smartthings in not in applicable conditions for mode to apply.')
                                            this.unsubscribe()
                                            this.runIn(5, initialize)
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            

	})

    .subscribedEventHandler('sunriseStopTimeHandler', (context, event) => {
        
                this.sunriseTurnOff(event.value)
            

	})

    .scheduledEventHandler('modeNowDeactivate', (context, event) => {
        
                let delay = 0
                delay += 3000
                console.log("Updated with settings: $settings")
                this.unsubscribe()
                this.runIn(5, initialize)
            

	})

    .scheduledEventHandler('timeModeTrigger', (context, event) => {
        
                if (timeSetup) {
                    let df = new java.text.SimpleDateFormat('EEEE')
                    df.setTimeZone(location.timeZone)
                    let day = df.format(new Date())
                    let dayCheck = days.contains(day)
                    if (dayCheck) {
                        let between = this.timeOfDayIsBetween(fromTime, toTime, new Date(), location.timeZone)
                        if (between) {
                            console.log('Time Validation successfull')
                            this.modeNowActive()
                        }
                    } else {
                        console.log('Time did not validate. No action')
                        this.unsubscribe()
                        this.runIn(5, initialize)
                    }
                }
            

	})

    .scheduledEventHandler('initialize', (context, event) => {
        
                if (stmode) {
                    this.subscribe(location, 'mode', modeTriggerEvt)
                }
                if (adtUseState) {
                    this.subscribe(location, 'securitySystemStatus', modeTriggerEvt)
                }
                if (shmUseState) {
                    this.subscribe(location, 'alarmSystemStatus', modeTriggerEvt)
                }
                if (virtualSwitch) {
                    console.log('Subscribing to virtualSwitch')
                    this.subscribe(virtualSwitch, 'switch.on', modeTriggerEvt)
                    this.subscribe(virtualSwitch, 'switch.off', modeTriggerEvt)
                }
                if (settings.timeSetup == 'Time') {
                    this.schedule(fromTime, timeModeTrigger)
                    this.schedule(toTime, modeNowDeactivate)
                }
                if (settings.timeSetup == 'Sunrise') {
                    if (settings.modeStart == 'Sunrise') {
                        this.subscribe(location, 'sunriseTime', sunriseTimeHandler)
                        this.sunriseTurnOn(location.currentValue('sunriseTime'))
                        this.subscribe(location, 'sunsetTime', sunsetStopTimeHandler)
                        this.sunsetTurnOff(location.currentValue('sunsetTime'))
                    }
                    if (settings.modeStart == 'Sunset') {
                        this.subscribe(location, 'sunsetTime', sunsetTimeHandler)
                        this.sunsetTurnOn(location.currentValue('sunsetTime'))
                        this.subscribe(location, 'sunriseTime', sunriseStopTimeHandler)
                        this.sunriseTurnOff(location.currentValue('sunriseTime'))
                    }
                }
                state.noteTime = this.now()
                state.noteTime2 = this.now()
                state.noteTime3 = this.now()
                state.noteTime4 = this.now()
                state.noteTime5 = this.now()
                state.modeActive = 0
                if (generalRule) {
                    this.modeNowActive()
                }
            

	})
