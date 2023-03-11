
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.runEvery5Minutes('poll', delay);

    })

    .scheduledEventHandler('poll', (context, event) => {
        
                this.setup()
                let nestresponse = state.nestdevices
                if (nestresponse) {
                    let devices = nestresponse.devices.thermostats
                    log.trace('Polling childs')
                    devices.each({ 
                        log.trace("Thermostat ${it.value.device_id} has been updated")
                        let childDevice = this.getChildDevice(it.value.device_id)
                        if (childDevice) {
                            if (it.value.is_online) {
                                let scale = this.getTemperatureScale()
                                let away = nestresponse.structures[it.value.structure_id].away.toString()
                                let rushhour = false
                                let rushhourstart = nestresponse.structures[it.value.structure_id].peak_period_start_time
                                let rushhourends = nestresponse.structures[it.value.structure_id].peak_period_end_time
                                if (rushhourstart) {
                                    let currenttime = this.now()
                                    rushhourstart = rushhourstart.fromSystemFormat().getTime()
                                    rushhourends = rushhourends.fromSystemFormat().getTime()
                                    if (rushhourstart <= currenttime && rushhourends >= currenttime ) {
                                        rushhour = true
                                    }
                                }
                                if (scale == 'F') {
                                    childDevice?.sendEvent(['name': 'temperature', 'value': it.value.ambient_temperature_f])
                                } else {
                                    childDevice?.sendEvent(['name': 'temperature', 'value': it.value.ambient_temperature_c])
                                }
                                childDevice?.sendEvent(['name': 'humidity', 'value': it.value.humidity])
                                if (it.value.can_heat) {
                                    childDevice?.sendEvent(['name': 'canheat', 'value': 'yes'])
                                } else {
                                    childDevice?.sendEvent(['name': 'canheat', 'value': 'no'])
                                }
                                if (it.value.can_cool) {
                                    childDevice?.sendEvent(['name': 'cancool', 'value': 'yes'])
                                } else {
                                    childDevice?.sendEvent(['name': 'cancool', 'value': 'no'])
                                }
                                if (it.value.has_leaf) {
                                    childDevice?.sendEvent(['name': 'leafinfo', 'value': 'yes'])
                                } else {
                                    childDevice?.sendEvent(['name': 'leafinfo', 'value': 'no'])
                                }
                                if (it.value.is_using_emergency_heat) {
                                    childDevice?.sendEvent(['name': 'emergencyheat', 'value': 'yes'])
                                } else {
                                    childDevice?.sendEvent(['name': 'emergencyheat', 'value': 'no'])
                                }
                                childDevice?.sendEvent(['name': 'presence', 'value': away ])
                                if (away == 'home' && !it.value.is_using_emergency_heat) {
                                    switch (it.value.hvac_mode) {
                                        case 'heat':
                                            if (scale == 'F') {
                                                childDevice?.sendEvent(['name': 'heatingSetpoint', 'value': it.value.target_temperature_f])
                                            } else {
                                                childDevice?.sendEvent(['name': 'heatingSetpoint', 'value': it.value.target_temperature_c])
                                            }
                                            childDevice?.sendEvent(['name': 'coolingSetpoint', 'value': ''])
                                            break
                                        case 'cool':
                                            childDevice?.sendEvent(['name': 'heatingSetpoint', 'value': ''])
                                            if (scale == 'F') {
                                                childDevice?.sendEvent(['name': 'coolingSetpoint', 'value': it.value.target_temperature_f])
                                            } else {
                                                childDevice?.sendEvent(['name': 'coolingSetpoint', 'value': it.value.target_temperature_c])
                                            }
                                            break
                                        case 'heat-cool':
                                            if (scale == 'F') {
                                                childDevice?.sendEvent(['name': 'heatingSetpoint', 'value': it.value.target_temperature_low_f])
                                                childDevice?.sendEvent(['name': 'coolingSetpoint', 'value': it.value.target_temperature_high_f])
                                            } else {
                                                childDevice?.sendEvent(['name': 'heatingSetpoint', 'value': it.value.target_temperature_low_c])
                                                childDevice?.sendEvent(['name': 'coolingSetpoint', 'value': it.value.target_temperature_high_c])
                                            }
                                            break
                                        case 'off':
                                            childDevice?.sendEvent(['name': 'heatingSetpoint', 'value': ''])
                                            childDevice?.sendEvent(['name': 'coolingSetpoint', 'value': ''])
                                            break
                                    }
                                    if (rushhour) {
                                        childDevice?.sendEvent(['name': 'thermostatMode', 'value': 'rushhour'])
                                    } else {
                                        childDevice?.sendEvent(['name': 'thermostatMode', 'value': it.value.hvac_mode])
                                    }
                                } else {
                                    if (it.value.is_using_emergency_heat) {
                                        childDevice?.sendEvent(['name': 'thermostatMode', 'value': 'emergency'])
                                    } else {
                                        childDevice?.sendEvent(['name': 'thermostatMode', 'value': away ])
                                        if (scale == 'F') {
                                            childDevice?.sendEvent(['name': 'heatingSetpoint', 'value': it.value.away_temperature_low_f])
                                            childDevice?.sendEvent(['name': 'coolingSetpoint', 'value': it.value.away_temperature_high_f])
                                        } else {
                                            childDevice?.sendEvent(['name': 'heatingSetpoint', 'value': it.value.away_temperature_low_c])
                                            childDevice?.sendEvent(['name': 'coolingSetpoint', 'value': it.value.away_temperature_high_c])
                                        }
                                    }
                                }
                            } else {
                                childDevice?.sendEvent(['name': 'thermostatMode', 'value': 'offline'])
                                childDevice?.sendEvent(['name': 'emergencyheat', 'value': 'no'])
                                childDevice?.sendEvent(['name': 'temperature', 'value': ''])
                                childDevice?.sendEvent(['name': 'humidity', 'value': ''])
                                childDevice?.sendEvent(['name': 'heatingSetpoint', 'value': ''])
                                childDevice?.sendEvent(['name': 'coolingSetpoint', 'value': ''])
                                childDevice?.sendEvent(['name': 'leafinfo', 'value': 'no'])
                            }
                        } else {
                            log.trace('This device doesn\'t exists')
                        }
                    })
                } else {
                }
            

	})
