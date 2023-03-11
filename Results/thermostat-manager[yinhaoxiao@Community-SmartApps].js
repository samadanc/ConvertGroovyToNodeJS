
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('contactOpenHandler', (context, event) => {
        
                let thermostatMode = thermostat.currentValue('thermostatMode')
                if (debug) {
                    console.log('Thermostat Manager - A contact has been opened.')
                }
                if (!disable && !disableEnergySaver && thermostatMode != 'off' && !state.openContactReported) {
                    state.openContactReported = true
                    this.runIn(openContactMinutes * 60, openContactPause)
                    console.log('Thermostat Manager - A contact has been opened. Initiating countdown to thermostat pause.')
                }
            

	})

    .subscribedEventHandler('contactClosedHandler', (context, event) => {
        
                if (debug) {
                    console.log('Thermostat Manager - A contact has been closed.')
                }
                if (!disable && !disableEnergySaver && state.openContactReported) {
                    if (!(contact.currentValue('contact').contains('open'))) {
                        console.log('Thermostat Manager - All contacts have been closed. Discontinuing any existing thermostat pause countdown.')
                        this.unschedule(openContactPause)
                        if (state.lastThermostatMode) {
                            if (state.lastThermostatMode == 'cool') {
                                this.logNNotify('Thermostat Manager - All contacts have been closed. Restoring cooling mode.')
                                thermostat.cool()
                            } else {
                                if (state.lastThermostatMode == 'auto') {
                                    this.logNNotify('Thermostat Manager - All contacts have been closed. Restoring auto mode.')
                                    thermostat.auto()
                                } else {
                                    this.logNNotify('Thermostat Manager - All contacts have been closed. Setting heating mode.')
                                    thermostat.heat()
                                }
                            }
                            state.lastThermostatMode = null
                        }
                        state.openContactReported = false
                    }
                }
            

	})

    .subscribedEventHandler('tempHandler', (context, event) => {
        
                let openContact = contact?.currentValue('contact')?.contains('open')
                let currentTemp = thermostat.currentValue('temperature')
                let coolingSetpoint = thermostat.currentValue('coolingSetpoint')
                let heatingSetpoint = thermostat.currentValue('heatingSetpoint')
                let thermostatMode = thermostat.currentValue('thermostatMode')
                let fanMode = thermostat.currentValue('thermostatFanMode')
                let homeMode = location.mode
                let securityStatus = location.currentValue('alarmSystemStatus')
                if (!openContact && state.lastThermostatMode) {
                    state.clear()
                }
                if (debug) {
                    if (!disableEnergySaver && contact ) {
                        console.log("Thermostat Manager - At least one contact is open: $openContact")
                        if (state.lastThermostatMode) {
                            console.log('Thermostat Manager is currently paused.')
                        }
                    }
                    console.log("Thermostat Manager - Smart Home Monitor Status: $securityStatus")
                    console.log("Thermostat Manager - Hello Home Mode: $homeMode")
                    console.log("Thermostat Manager - Fan Mode: $fanMode")
                    console.log("Thermostat Manager - Mode: $thermostatMode")
                    console.log("Thermostat Manager - Cooling Setpoint: $coolingSetpoint | Heating Setpoint: $heatingSetpoint")
                    console.log("Thermostat Manager - Temperature: $currentTemp")
                }
                if (!disable && setFan && fanMode != 'auto') {
                    this.logNNotify('Thermostat Manager setting fan mode auto.')
                    thermostat.fanAuto()
                }
                if (!disable && disableEnergySaver || !state.lastThermostatMode && thermostatMode != 'cool' && !manualOverride || manualOverride && thermostatMode != 'off' && coolingThreshold && Math.round(currentTemp) > Math.round(coolingThreshold)) {
                    this.logNNotify("Thermostat Manager - The temperature has risen to $currentTemp. Setting cooling mode.")
                    thermostat.cool()
                    if (!disableSHMSPEnforce) {
                        if (securityStatus == 'off' && offCoolingSetPoint ) {
                            this.runIn(60, enforceCoolingSetPoint, ['data': ['setPoint': offCoolingSetPoint ]])
                        } else {
                            if (securityStatus == 'stay' && stayCoolingSetPoint ) {
                                this.runIn(60, enforceCoolingSetPoint, ['data': ['setPoint': stayCoolingSetPoint ]])
                            } else {
                                if (securityStatus == 'away' && awayCoolingSetPoint ) {
                                    this.runIn(60, enforceCoolingSetPoint, ['data': ['setPoint': awayCoolingSetPoint ]])
                                }
                            }
                        }
                    }
                } else {
                    if (!disable && disableEnergySaver || !state.lastThermostatMode && thermostatMode != 'heat' && !manualOverride || manualOverride && thermostatMode != 'off' && heatingThreshold && Math.round(currentTemp) < Math.round(heatingThreshold)) {
                        this.logNNotify("Thermostat Manager - The temperature has fallen to $currentTemp. Setting heating mode.")
                        thermostat.heat()
                        if (!disableSHMSPEnforce) {
                            if (securityStatus == 'off' && offHeatingSetPoint ) {
                                this.runIn(60, enforceHeatingSetPoint, ['data': ['setPoint': offHeatingSetPoint ]])
                            } else {
                                if (securityStatus == 'stay' && stayHeatingSetPoint ) {
                                    this.runIn(60, enforceHeatingSetPoint, ['data': ['setPoint': stayHeatingSetPoint ]])
                                } else {
                                    if (securityStatus == 'away' && awayHeatingSetPoint ) {
                                        this.runIn(60, enforceHeatingSetPoint, ['data': ['setPoint': awayHeatingSetPoint ]])
                                    }
                                }
                            }
                        }
                    } else {
                        if (debug) {
                            console.log('Thermostat Manager standing by.')
                        }
                    }
                }
            

	})
