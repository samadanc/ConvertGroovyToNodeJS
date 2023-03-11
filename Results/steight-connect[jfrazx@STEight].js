
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.runEvery3Hours('updateDevices', delay);

        context.api.schedules.runEvery5Minutes('refreshDevices', delay);

    })

    .subscribedEventHandler('eventHandler', (context, event) => {
        
                console.log("Executing 'eventHandler' for ${event.displayName}")
                let msg 
                if (event.value == 'open') {
                    msg = "${event.displayName} is out of bed."
                    if (settings.outOfBedNotification) {
                        this.messageHandler(msg, false)
                    }
                } else {
                    if (event.value == 'closed') {
                        msg = "${event.displayName} is in bed."
                        if (settings.inBedNotification) {
                            this.messageHandler(msg, false)
                        }
                    } else {
                        if (event.value == 'on') {
                            msg = "${event.displayName} is on."
                            if (settings.onNotification) {
                                this.messageHandler(msg, false)
                            }
                        } else {
                            if (event.value == 'off') {
                                msg = "${event.displayName} is off."
                                if (settings.offNotification) {
                                    this.messageHandler(msg, false)
                                }
                            } else {
                                if (event.value == 'true') {
                                    msg = "${event.displayName} has reached desired temperature."
                                    if (settings.heatLevelReachedNotification) {
                                        this.messageHandler(msg, false)
                                    }
                                } else {
                                    if (event.name == 'battery') {
                                        msg = "${event.displayName} sleep score is ${event.value}."
                                        if (settings.sleepScoreNotification) {
                                            this.messageHandler(msg, false)
                                        }
                                    }
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
                state.eightSleepDevices = [:]
                let selectors = []
                devices.each({ let device ->
                    console.log("Identified: device $device")
                    let value = "Eight Sleep ${device.reverse().take(4).reverse()}"
                    let key = device 
                    state.eightSleepDevices["$key"] = value 
                    let resp = this.apiGET("/devices/$device?filter=ownerId,leftUserId,rightUserId")
                    if (resp.status == 200) {
                        let leftUserId = resp.data.result.leftUserId
                        let rightUserId = resp.data.result.rightUserId
                        selectors.add("$device/$leftUserId")
                        selectors.add("$device/$rightUserId")
                    } else {
                        log.error("Non-200 from device list call. ${resp.status} ${resp.data}")
                        return []
                    }
                })
                console.log(selectors)
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
        
                log.info('Executing refreshDevices...')
                atomicState.renewAttempt = 0
                atomicState.renewAttemptPartner = 0
                this.getChildDevices().each({ let device ->
                    log.info("Refreshing device ${device.name} ...")
                    device.refresh()
                })
            

	})
