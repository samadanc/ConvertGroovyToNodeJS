
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('reverseActionsScheduled', delay);

    })

    .subscribedEventHandler('opStateHandler', (context, event) => {
        
                this.LOG("${event.name}: ${event.value}", 2, null, 'info')
                String oldOpState = atomicState.thermostatOpState
                String newOpState = event.value
                atomicState.thermostatOpState = event.value
                if (!(settings.theOpState.contains(oldOpState)) && !(settings.theOpState.contains(newOpState))) {
                    atomicState.currentAction = ' - unchanged'
                    this.updateMyLabel()
                    return null
                }
                atomicState.currentAction = ' - unchanged'
                if (!(this.dayCheck())) {
                    this.LOG('Not configured to run Actions today, ignoring', 2, null, 'info')
                    this.updateMyLabel()
                    return null
                }
                let between = settings.fromTime != null && settings.toTime != null ? this.myTimeOfDayIsBetween(this.timeToday(settings.fromTime), this.timeToday(settings.toTime), new Date(), location.timeZone) : false
                if (between) {
                    this.LOG('Not running Actions because the current time is within the disabled time window', 2, null, 'info')
                    this.updateMyLabel()
                    return null
                }
                if (event.value == 'idle' || settings.fanOnly && event.value == 'fan only') {
                    if (settings.reverseOnIdle) {
                        let isReallyIdle = true
                        if (settings.theThermostats.size() > 1) {
                            settings.theThermostats.each({ 
                                String ncTos = ST ? it.currentValue('thermostatOperatingState') : it.currentValue('thermostatOperatingState', true)
                                if (ncTos != 'idle' && !settings.fanOnly || ncTos != 'fan only') {
                                    isReallyIdle = false
                                }
                            })
                        }
                        if (isReallyIdle) {
                            this.reverseActions()
                        }
                        this.updateMyLabel()
                        return null
                    }
                } else {
                    if (settings.theOpState.contains(event.value)) {
                        HashMap priorState = (atomicState.priorState as HashMap)
                        if (!priorState) {
                            priorState = (([:]) as HashMap)
                        }
                        if (settings.theOnSwitches) {
                            settings.theOnSwitches.each({ let theSwitch ->
                                String cs = theSwitch.currentSwitch
                                if (settings.reversePreserve) {
                                    String dni = (theSwitch.device.deviceNetworkId as String)
                                    if (!(priorState[ dni ])) {
                                        priorState[ dni ] = []
                                    }
                                    priorState[ dni ] << ['action': 'on', 'type': 'switch', 'value': cs ]
                                }
                                if (cs != 'on') {
                                    this.LOG("Turning on ${theSwitch.displayName}", 2, null, 'info')
                                    theSwitch.on()
                                } else {
                                    this.LOG("${theSwitch.displayName} was already on", 2, null, 'info')
                                }
                            })
                            atomicState.currentAction = ' - activated'
                        }
                        if (settings.theOnDimmers) {
                            settings.theOnDimmers.each({ let dimmer ->
                                let cl = dimmer.currentLevel
                                String cs = dimmer.currentSwitch
                                if (settings.reversePreserve) {
                                    String dni = dimmer.device.deviceNetworkId
                                    if (!(priorState[ dni ])) {
                                        priorState[ dni ] = []
                                    }
                                    priorState[ dni ] << ['action': 'on', 'type': 'dimmer', 'value': cl ]
                                    priorState[ dni ] << ['action': 'on', 'type': 'switch', 'value': cs ]
                                }
                                let tl = settings.onDimmerLevel ? settings.onDimmerLevel : 99
                                if (cl != tl ) {
                                    dimmer.setLevel(tl)
                                    this.LOG("Setting ${dimmer.displayName} to $tl%", 2, null, 'info')
                                } else {
                                    this.LOG("${dimmer.displayName} was already at $tl%", 2, null, 'info')
                                }
                                if (cs != 'on') {
                                    this.LOG("Turning on ${dimmer.displayName}", 2, null, 'info')
                                    dimmer.on()
                                }
                            })
                            atomicState.currentAction = ' - activated'
                        }
                        if (settings.theOnFans) {
                            settings.theOnFans.each({ let fan ->
                                String fs = fan.currentSpeed
                                String cs = fan.getSupportedCommands().contains('on') ? fan.currentSwitch : ''
                                if (settings.reversePreserve) {
                                    String dni = fan.device.deviceNetworkId
                                    if (!(priorState[ dni ])) {
                                        priorState[ dni ] = []
                                    }
                                    priorState[ dni ] << ['action': 'on', 'type': 'speed', 'value': fs ]
                                    priorState[ dni ] << ['action': 'on', 'type': 'switch', 'value': cs ]
                                }
                                String ts = settings.onFanSpeed ? settings.onFanSpeed : 'low'
                                if (fs != ts ) {
                                    fan.setSpeed(ts)
                                    this.LOG("Setting ${fan.displayName} to $ts", 2, null, 'info')
                                } else {
                                    this.LOG("${fan.displayName} was already set to $ts", 2, null, 'info')
                                }
                                if (cs && cs != 'on') {
                                    this.LOG("Turning on ${fan.displayName}", 2, null, 'info')
                                    fan.on()
                                }
                            })
                            atomicState.currentAction = ' - activated'
                        }
                        if (settings.theOffSwitches) {
                            settings.theOffSwitches.each({ let theSwitch ->
                                String cs = theSwitch.currentSwitch
                                if (settings.reversePreserve) {
                                    String dni = (theSwitch.device.deviceNetworkId as String)
                                    if (!(priorState[ dni ])) {
                                        priorState[ dni ] = []
                                    }
                                    priorState[ dni ] << ['action': 'off', 'type': 'switch', 'value': cs ]
                                }
                                if (cs != 'off') {
                                    this.LOG("Turning off ${theSwitch.displayName}", 2, null, 'info')
                                    theSwitch.on()
                                } else {
                                    this.LOG("${theSwitch.displayName} was already off", 2, null, 'info')
                                }
                            })
                            atomicState.currentAction = ' - activated'
                        }
                        if (settings.theOffDimmers) {
                            settings.theOffDimmers.each({ let dimmer ->
                                let cl = dimmer.currentLevel
                                String cs = dimmer.currentSwitch
                                if (settings.reversePreserve) {
                                    String dni = dimmer.device.deviceNetworkId
                                    if (!(priorState[ dni ])) {
                                        priorState[ dni ] = []
                                    }
                                    priorState[ dni ] << ['action': 'off', 'type': 'dimmer', 'value': cl ]
                                    priorState[ dni ] << ['action': 'off', 'type': 'switch', 'value': cs ]
                                }
                                let tl = settings.offDimmerLevel ? settings.offDimmerLevel : 0
                                if (tl != 0) {
                                    if (cl != tl ) {
                                        dimmer.setLevel(tl)
                                        this.LOG("Setting ${dimmer.displayName} to $tl%", 2, null, 'info')
                                    } else {
                                        this.LOG("${dimmer.displayName} was already at $tl%", 2, null, 'info')
                                    }
                                    if (dimmer.currentSwitch != 'on') {
                                        this.LOG("Turning on ${dimmer.displayName}", 2, null, 'info')
                                        dimmer.on()
                                    }
                                } else {
                                    if (cl != 0) {
                                        if (dimmer.currentSwitch != 'off') {
                                            this.LOG("Turning off ${dimmer.displayName}", 2, null, 'info')
                                            dimmer.setLevel(0)
                                            dimmer.off()
                                        }
                                    }
                                }
                            })
                            atomicState.currentAction = ' - activated'
                        }
                        if (settings.theOffFans) {
                            settings.theOffFans.each({ let fan ->
                                String fs = fan.currentSpeed
                                String cs = fan.getSupportedCommands().contains('off') ? fan.currentSwitch : ''
                                if (settings.reversePreserve) {
                                    String dni = fan.device.deviceNetworkId
                                    if (!(priorState[ dni ])) {
                                        priorState[ dni ] = []
                                    }
                                    priorState[ dni ] << ['action': 'off', 'type': 'speed', 'value': fs ]
                                    priorState[ dni ] << ['action': 'off', 'type': 'switch', 'value': cs ]
                                }
                                String ts = settings.offFanSpeed ? settings.offFanSpeed : 'off'
                                if (fs != ts ) {
                                    fan.setSpeed(ts)
                                    this.LOG("Setting ${fan.displayName} to $ts", 2, null, 'info')
                                } else {
                                    this.LOG("${fan.displayName} was already set to $ts", 2, null, 'info')
                                }
                                if (cs && cs != 'off') {
                                    this.LOG("Turning off ${fan.displayName}", 2, null, 'info')
                                    fan.off()
                                }
                            })
                            atomicState.currentAction = ' - activated'
                        }
                        atomicState.priorState = priorState 
                    }
                }
                this.updateMyLabel()
            

	})
