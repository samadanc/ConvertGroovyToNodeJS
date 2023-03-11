
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.runIn('masterFanStateHandler', delay);

    })

    .subscribedEventHandler('masterFanStateHandler', (context, event) => {
        
                this.LOG("masterFanStateHander() entered with evt: $evt", 5)
                let masterOperatingState = evt ? event.value : masterThermostat.currentThermostatOperatingState
                this.LOG("masterFanStateHandler() master thermostatOperatingState = $masterOperatingState", 3)
                switch ( masterOperatingState ) {
                    case 'fan only':
                        slaveThermostats.each({ let stat ->
                            if (stat.currentThermostatOperatingState == 'idle') {
                                stat.setThermostatFanMode('on', 'nextTransition')
                                state."${stat.displayName}-fanOn" = true
                                this.LOG("masterFanStateHandler() turned ${stat.displayName} fan ON", 3)
                            }
                        })
                        break
                    case 'idle':
                    case 'heating':
                    case 'cooling':
                        slaveThermostats.each({ let stat ->
                            if (state."${stat.displayName}-fanOn") {
                                if (stat.currentValue('currentProgramName') == 'Hold: Fan') {
                                    stat.resumeProgram(false)
                                }
                                state."${stat.displayName}-fanOn" = false
                                this.LOG("masterFanStateHandler() returned ${stat.displayName} to prior fan mode", 3)
                            }
                        })
                        break
                    default: 
                    break
                }
            

	})

    .scheduledEventHandler('masterFanStateHandler', (context, event) => {
        
                this.LOG("masterFanStateHander() entered with evt: $evt", 5)
                let masterOperatingState = evt ? event.value : masterThermostat.currentThermostatOperatingState
                this.LOG("masterFanStateHandler() master thermostatOperatingState = $masterOperatingState", 3)
                switch ( masterOperatingState ) {
                    case 'fan only':
                        slaveThermostats.each({ let stat ->
                            if (stat.currentThermostatOperatingState == 'idle') {
                                stat.setThermostatFanMode('on', 'nextTransition')
                                state."${stat.displayName}-fanOn" = true
                                this.LOG("masterFanStateHandler() turned ${stat.displayName} fan ON", 3)
                            }
                        })
                        break
                    case 'idle':
                    case 'heating':
                    case 'cooling':
                        slaveThermostats.each({ let stat ->
                            if (state."${stat.displayName}-fanOn") {
                                if (stat.currentValue('currentProgramName') == 'Hold: Fan') {
                                    stat.resumeProgram(false)
                                }
                                state."${stat.displayName}-fanOn" = false
                                this.LOG("masterFanStateHandler() returned ${stat.displayName} to prior fan mode", 3)
                            }
                        })
                        break
                    default: 
                    break
                }
            

	})
