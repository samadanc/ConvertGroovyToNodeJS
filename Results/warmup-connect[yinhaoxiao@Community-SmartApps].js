
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('refreshDevices', delay);

        context.api.schedules.runEvery3Hours('updateDevices', delay);

    })

    .scheduledEventHandler('refreshDevices', (context, event) => {
        
                log.info('Executing refreshDevices...')
                this.getChildDevices().each({ let device ->
                    log.info("Refreshing device ${device.name} ...")
                    device.refresh()
                })
            

	})

    .scheduledEventHandler('updateDevices', (context, event) => {
        
                if (!state.devices) {
                    state.devices = [:]
                }
                let devices = this.devicesList()
                state.warmup4IEDevices = [:]
                let selectors = []
                devices.each({ let device ->
                    console.log("Identified: device ${device.roomId}: ${device.roomName}: ${device.targetTemp}: ${device.currentTemp}: ${device.energy}")
                    selectors.add("${device.roomId}")
                    let value = "${device.roomName} Warmup"
                    let key = device.roomId
                    state.warmup4IEDevices["$key"] = value 
                    let childDevice = this.getChildDevice("${device.roomId}")
                    if (childDevice) {
                        if (childDevice.name != device.roomName + ' Warmup') {
                            childDevice.name = device.roomName + ' Warmup'
                            console.log('Device\'s name has changed.')
                        }
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
