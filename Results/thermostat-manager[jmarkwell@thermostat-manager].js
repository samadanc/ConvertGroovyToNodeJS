
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('outdoorTempHandler', (context, event) => {
        
                let openContact = contact?.currentValue('contact')?.contains('open')
                let currentTemp = Math.round(new BigDecimal(tempSensor.currentValue('temperature').toString()))
                let currentOutdoorTemp = Math.round(new BigDecimal(outdoorTempSensor.currentValue('temperature').toString()))
                let heatingSetpoint = this.getHeatingSetpoint()
                let coolingSetpoint = this.getCoolingSetpoint()
                let currentThermostatMode = this.getThermostatMode()
                let fanMode = this.getFanMode()
                let homeMode = location.mode
                let SHMSetPoint = this.getSHMSetPoint(currentThermostatMode)
                this.esConflictResolver()
                if (debug) {
                    if (!disableEnergySaver && contact ) {
                        console.log("Thermostat_Manager.outdoorTempHandler(): At least one contact is open: $openContact")
                        if (state.lastThermostatMode) {
                            console.log('Thermostat_Manager.outdoorTempHandler(): Thermostat Manager is currently paused.')
                        }
                    }
                    console.log("Thermostat_Manager.outdoorTempHandler(): Hello Home Mode: $homeMode")
                    console.log("Thermostat_Manager.outdoorTempHandler(): Fan Mode: $fanMode")
                    console.log("Thermostat_Manager.outdoorTempHandler(): Mode: $currentThermostatMode")
                    console.log("Thermostat_Manager.outdoorTempHandler(): Heating Threshold: $heatingThreshold | Cooling Threshold: $coolingThreshold")
                    if (SHMSetPoint) {
                        console.log("Thermostat_Manager.outdoorTempHandler(): Mode Configuration SetPoint: $SHMSetPoint")
                    }
                    console.log("Thermostat_Manager.outdoorTempHandler(): Heating Setpoint: $heatingSetpoint | Cooling Setpoint: $coolingSetpoint")
                    console.log("Thermostat_Manager.outdoorTempHandler(): Outdoor Temperature: $currentOutdoorTemp")
                    console.log("Thermostat_Manager.outdoorTempHandler(): Indoor Temperature: $currentTemp")
                }
                if (!disable && setFan && fanMode != 'auto') {
                    this.logNNotify('Thermostat Manager setting fan mode auto.')
                    this.setFanAuto()
                }
                if (!disable && !disableExtEmergencyHeat && disableEnergySaver || !state.lastThermostatMode && !manualOverride || manualOverride && currentThermostatMode != 'off' && currentThermostatMode != 'emergency heat' && !heatingThreshold || heatingThreshold && currentTemp < heatingThreshold && emergencyHeatThreshold && currentOutdoorTemp < emergencyHeatThreshold ) {
                    this.logNNotify("Thermostat Manager - Outdoor temperature has fallen to $currentOutdoorTemp. Setting emergency heat mode.")
                    this.setEmergencyHeatMode()
                    let setSetPoint = this.getSHMSetPoint('emergency heat')
                    this.runIn(60, verifyAndEnforce, ['data': ['setPoint': setSetPoint , 'mode': 'emergency heat', 'count': 1]])
                } else {
                    if (!disable && !disableExtEmergencyHeat && !disableHeat && !useEmergencyHeat && currentThermostatMode == 'emergency heat' && !coolingThreshold || disableCool || coolingThreshold && currentTemp < coolingThreshold && heatingThreshold && currentTemp < heatingThreshold && emergencyHeatThreshold && currentOutdoorTemp > emergencyHeatThreshold ) {
                        this.logNNotify("Thermostat Manager - Outdoor temperature has risen to $currentOutdoorTemp. Setting heat mode.")
                        this.setHeatMode()
                        let setSetPoint = this.getSHMSetPoint('heat')
                        this.runIn(60, verifyAndEnforce, ['data': ['setPoint': setSetPoint , 'mode': 'heat', 'count': 1]])
                    } else {
                        if (debug) {
                            console.log('Thermostat_Manager.outdoorTempHandler(): Thermostat Manager standing by.')
                        }
                    }
                }
            

	})

    .subscribedEventHandler('contactOpenHandler', (context, event) => {
        
                if (debug) {
                    console.log('Thermostat_Manager.contactOpenHandler(): A contact has been opened.')
                }
                if (!disable && !disableEnergySaver && !state.openContactReported) {
                    state.openContactReported = true
                    if (openContactMinutes && !state.lastThermostatMode) {
                        this.runIn(openContactMinutes * 60, openContactPause)
                        console.log('Thermostat_Manager.contactOpenHandler(): Initiating countdown to thermostat pause.')
                    }
                }
            

	})

    .subscribedEventHandler('contactClosedHandler', (context, event) => {
        
                if (debug) {
                    console.log('Thermostat_Manager.contactClosedHandler(): A contact has been closed.')
                }
                this.esConflictResolver()
            

	})

    .subscribedEventHandler('tempHandler', (context, event) => {
        
                let openContact = contact?.currentValue('contact')?.contains('open')
                let currentTemp = Math.round(new BigDecimal(tempSensor.currentValue('temperature').toString()))
                let currentOutdoorTemp = outdoorTempSensor?.currentValue('temperature') ? Math.round(new BigDecimal(outdoorTempSensor?.currentValue('temperature')?.toString())) : null
                let heatingSetpoint = this.getHeatingSetpoint()
                let coolingSetpoint = this.getCoolingSetpoint()
                let currentThermostatMode = this.getThermostatMode()
                let fanMode = this.getFanMode()
                let homeMode = location.mode
                let SHMSetPoint = this.getSHMSetPoint(currentThermostatMode)
                this.esConflictResolver()
                if (debug) {
                    if (!disableEnergySaver && contact ) {
                        console.log("Thermostat_Manager.tempHandler(): At least one contact is open: $openContact")
                        if (state.lastThermostatMode) {
                            console.log('Thermostat_Manager.tempHandler(): Thermostat Manager is currently paused.')
                        }
                    }
                    console.log("Thermostat_Manager.tempHandler(): Hello Home Mode: $homeMode")
                    console.log("Thermostat_Manager.tempHandler(): Fan Mode: $fanMode")
                    console.log("Thermostat_Manager.tempHandler(): Mode: $currentThermostatMode")
                    console.log("Thermostat_Manager.tempHandler(): Heating Threshold: $heatingThreshold | Cooling Threshold: $coolingThreshold")
                    if (SHMSetPoint) {
                        console.log("Thermostat_Manager.tempHandler(): Mode Configuration SetPoint: $SHMSetPoint")
                    }
                    console.log("Thermostat_Manager.tempHandler(): Heating Setpoint: $heatingSetpoint | Cooling Setpoint: $coolingSetpoint")
                    if (currentOutdoorTemp) {
                        console.log("Thermostat_Manager.tempHandler(): Outdoor Temperature: $currentOutdoorTemp")
                    }
                    console.log("Thermostat_Manager.tempHandler(): Indoor Temperature: $currentTemp")
                }
                if (!disable && setFan && fanMode != 'auto') {
                    this.logNNotify('Thermostat Manager setting fan mode auto.')
                    this.setFanAuto()
                }
                if (!disable && !disableHeat && disableEnergySaver || !state.lastThermostatMode && !manualOverride || manualOverride && currentThermostatMode != 'off' && !useEmergencyHeat && currentThermostatMode != 'heat' && currentThermostatMode != 'emergency heat' && heatingThreshold && currentTemp < heatingThreshold ) {
                    this.logNNotify("Thermostat Manager - The temperature has fallen to $currentTemp. Setting heat mode.")
                    this.setHeatMode()
                    let setSetPoint = this.getSHMSetPoint('heat')
                    this.runIn(60, verifyAndEnforce, ['data': ['setPoint': setSetPoint , 'mode': 'heat', 'count': 1]])
                } else {
                    if (!disable && !disableCool && disableEnergySaver || !state.lastThermostatMode && !manualOverride || manualOverride && currentThermostatMode != 'off' && currentThermostatMode != 'cool' && coolingThreshold && currentTemp > coolingThreshold ) {
                        this.logNNotify("Thermostat Manager - The temperature has risen to $currentTemp. Setting cooling mode.")
                        this.setCoolMode()
                        let setSetPoint = this.getSHMSetPoint('cool')
                        this.runIn(60, verifyAndEnforce, ['data': ['setPoint': setSetPoint , 'mode': 'cool', 'count': 1]])
                    } else {
                        if (!disable && disableEnergySaver || !state.lastThermostatMode && !manualOverride || manualOverride && currentThermostatMode != 'off' && useEmergencyHeat && currentThermostatMode != 'emergency heat' && heatingThreshold && currentTemp < heatingThreshold ) {
                            this.logNNotify("Thermostat Manager - The temperature has fallen to $currentTemp. Setting emergency heat mode.")
                            this.setEmergencyHeatMode()
                            let setSetPoint = this.getSHMSetPoint('emergency heat')
                            this.runIn(60, verifyAndEnforce, ['data': ['setPoint': setSetPoint , 'mode': 'emergency heat', 'count': 1]])
                        } else {
                            if (!disable && !disableHeat && !useEmergencyHeat && currentThermostatMode == 'emergency heat' && !coolingThreshold || disableCool || coolingThreshold && currentTemp < coolingThreshold && heatingThreshold && currentTemp > heatingThreshold && disableExtEmergencyHeat || !disableExtEmergencyHeat && currentOutdoorTemp && emergencyHeatThreshold && currentOutdoorTemp > emergencyHeatThreshold ) {
                                this.logNNotify("Thermostat Manager - The temperature has risen to $currentTemp. Setting heat mode.")
                                this.setHeatMode()
                                let setSetPoint = this.getSHMSetPoint('heat')
                                this.runIn(60, verifyAndEnforce, ['data': ['setPoint': setSetPoint , 'mode': 'heat', 'count': 1]])
                            } else {
                                if (!disable && SHMSetPoint && enforceSetPoints || enforceArmedSetPoints && armedModes?.contains(location.mode) && currentThermostatMode == 'heat' || currentThermostatMode == 'emergency heat' && heatingSetpoint != SHMSetPoint || currentThermostatMode == 'cool' && coolingSetpoint != SHMSetPoint ) {
                                    this.runIn(60, verifyAndEnforce, ['data': ['setPoint': SHMSetPoint , 'mode': currentThermostatMode , 'count': 1]])
                                } else {
                                    if (!disable && !disableEnergySaver && state.lastThermostatMode && enforcePause && currentThermostatMode != 'off') {
                                        this.logNNotify('Thermostat Manager - Thermostat mode has been changed during an Energy Saver pause. Setting off mode.')
                                        this.setOffMode()
                                    } else {
                                        if (debug) {
                                            console.log('Thermostat_Manager.tempHandler(): Thermostat Manager standing by.')
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            

	})
