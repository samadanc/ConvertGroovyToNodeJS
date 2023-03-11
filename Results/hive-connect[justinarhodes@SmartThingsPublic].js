
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.runEvery3Hours('updateDevices', delay);

        context.api.schedules.runIn('refreshDevices', delay);

        context.api.schedules.runEvery10Minutes('refreshDevices', delay);

    })

    .subscribedEventHandler('tempHandler', (context, event) => {
        
                let msg 
                log.trace("temperature: ${event.value}, $evt")
                if (settings.maxtemp != null) {
                    let maxTemp = settings.maxtemp
                    if (event.doubleValue >= maxTemp ) {
                        msg = "${event.displayName} temperature reading is very hot."
                        if (state.maxNotificationSent == null || state.maxNotificationSent == false) {
                            this.generateNotification(msg)
                            state.maxNotificationSent = true
                        }
                    } else {
                        state.maxNotificationSent = false
                    }
                } else {
                    if (settings.mintemp != null) {
                        let minTemp = settings.mintemp
                        if (event.doubleValue <= minTemp ) {
                            msg = "${event.displayName} temperature reading is very cold."
                            if (state.minNotificationSent == null || state.minNotificationSent == false) {
                                this.generateNotification(msg)
                                state.minNotificationSent = true
                            }
                        } else {
                            state.minNotificationSent = false
                        }
                    }
                }
            

	})

    .subscribedEventHandler('modeHandler', (context, event) => {
        
                let msg 
                if (event.value == 'heat') {
                    msg = "${event.displayName} is set to Manual"
                    if (settings.sendSchedule) {
                        this.generateNotification(msg)
                    }
                } else {
                    if (event.value == 'off') {
                        msg = "${event.displayName} is turned Off"
                        if (settings.sendOff) {
                            this.generateNotification(msg)
                        }
                    } else {
                        if (event.value == 'auto') {
                            msg = "${event.displayName} is set to Schedule"
                            if (settings.sendManual) {
                                this.generateNotification(msg)
                            }
                        } else {
                            if (event.value == 'emergency heat') {
                                msg = "${event.displayName} is in Boost mode"
                                if (settings.sendBoost) {
                                    this.generateNotification(msg)
                                }
                            }
                        }
                    }
                }
            

	})

    .scheduledEventHandler('updateDevices', (context, event) => {
        
                if (!state.devices) {
                    state.devices = [:]
                }
                let devices = this.devicesList()
                state.hiveHeatingDevices = [:]
                state.hiveHotWaterDevices = [:]
                let selectors = []
                devices.each({ let device ->
                    selectors.add("${device.id}")
                    if (device.attributes.activeHeatCoolMode != null) {
                        let parentNode = devices.find({ let d ->
                            d.id == device.parentNodeId
                        })
                        if (device.attributes.supportsHotWater != null && device.attributes.supportsHotWater.reportedValue == false && device.attributes.temperature != null) {
                            let value = "${parentNode.name} Hive Heating"
                            let key = device.id
                            state.hiveHeatingDevices["$key"] = value 
                            let childDevice = this.getChildDevice("${device.id}")
                            if (childDevice) {
                                if (childDevice.name != parentNode.name + ' Hive Heating') {
                                    childDevice.name = parentNode.name + ' Hive Heating'
                                    console.log('Device\'s name has changed.')
                                }
                            }
                        } else {
                            if (device.attributes.supportsHotWater != null && device.attributes.supportsHotWater.reportedValue == true) {
                                let value = "${parentNode.name} Hive Hot Water"
                                let key = device.id
                                state.hiveHotWaterDevices["$key"] = value 
                                let childDevice = this.getChildDevice("${device.id}")
                                if (childDevice) {
                                    if (childDevice.name != parentNode.name + ' Hive Hot Water') {
                                        childDevice.name = parentNode.name + ' Hive Hot Water'
                                        console.log('Device\'s name has changed.')
                                    }
                                }
                            }
                        }
                    }
                })
                this.getChildDevices().findAll({ 
                    !(selectors.contains("${it.deviceNetworkId}"))
                }).each({ 
                    log.info("Deleting ${it.deviceNetworkId}")
                    try {
                        this.deleteChildDevice(it.deviceNetworkId)
                    } 
                    catch (physicalgraph.exception.NotFoundException e) {
                        log.info("Could not find ${it.deviceNetworkId}. Assuming manually deleted.")
                    } 
                    catch (physicalgraph.exception.ConflictException ce) {
                        log.info("Device ${it.deviceNetworkId} in use. Please manually delete.")
                    } 
                })
            

	})

    .scheduledEventHandler('refreshDevices', (context, event) => {
        
                log.info('Refreshing all devices...')
                this.getChildDevices().each({ let device ->
                    device.refresh()
                })
            

	})
