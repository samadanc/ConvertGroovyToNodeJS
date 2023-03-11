
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.runIn('theAdjuster', delay);

    })

    .subscribedEventHandler('changeHandler', (context, event) => {
        
                this.LOG("${event.displayName} ${event.name} ${event.value}", 4, null, 'trace')
                this.runIn(2, 'theAdjuster', ['overwrite': true])
            

	})

    .subscribedEventHandler('thermostatHandler', (context, event) => {
        
                String dni = (event.device.deviceNetworkId as String)
                String tid = this.getDeviceId(dni)
                java.lang.Boolean notNow = false
                if (!(this.dayCheck())) {
                    if (atomicState.HVACModeState != 'idle') {
                        this.LOG('Not configured to run Actions today, ignoring', 2, null, 'info')
                    }
                    notNow = true
                }
                let between = settings.fromTime != null && settings.toTime != null ? this.myTimeOfDayIsBetween(this.timeToday(settings.fromTime), this.timeToday(settings.toTime), new Date(), location.timeZone) : true
                if (!notNow && !between) {
                    if (atomicState.HVACModeState != 'idle') {
                        this.LOG('Not configured to run Actions at this time, ignoring', 2, null, 'info')
                    }
                    notNow = true
                }
                if (notNow) {
                    if (atomicState.HVACModeState == 'off') {
                        theThermostats.each({ let stat ->
                            this.turnOnHVAC(stat)
                        })
                        atomicState.HVACModeState == 'idle'
                    }
                } else {
                    if (event.value.startsWith('idle') && tid == atomicState.runningThermostat) {
                        atomicState.HVACModeState = 'on'
                        atomicState.runningThermostat = ''
                        theThermostats.each({ let stat ->
                            if (stat.deviceNetworkId != dni ) {
                                this.turnOnHVAC(stat)
                            }
                        })
                    } else {
                        if (settings?.busyStates?.contains(event.value)) {
                            atomicState.runningThermostat = tid 
                            atomicState.HVACModeState = 'off'
                            theThermostats.each({ let stat ->
                                if (stat.deviceNetworkId != dni ) {
                                    this.turnOffHVAC(stat)
                                }
                            })
                        } else {
                            this.LOG("thermostatHandler(): ${event.name} = ${event.value} for ${event.device.displayName} - nothing to do...", 3, null, 'info')
                        }
                    }
                }
            

	})

    .subscribedEventHandler('masterFanStateHandler', (context, event) => {
        
                this.LOG("${event.displayName} ${event.name} ${event.value}", 4, null, 'trace')
                this.runIn(2, 'theAdjuster', ['overwrite': true])
            

	})
