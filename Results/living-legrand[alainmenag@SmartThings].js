
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.runEvery3Hours('updateDevices', delay);

    })

    .scheduledEventHandler('updateDevices', (context, event) => {
        
                if (!state.devices) {
                    state.devices = [:]
                }
                let selectors = []
                let devices = this.devicesInLocation()
                log.warn("Active Legran Zones: $devices")
                devices.each({ let device ->
                    let childDevice = this.getChildDevice(device.id)
                    console.log("Child Devices: $childDevice")
                    selectors.add("${device.id}")
                    if (!childDevice) {
                        log.info("Adding Device: ID: ${device.id} Product: ${device.product}")
                        let data = ['label': device.name, 'level': Math.round(device.brightness ? device.brightness : 1 * 100), 'switch': device.connected ? device.power : 'unreachable']
                        childDevice = this.addChildDevice(app.namespace, 'Living Legrand Zones', device.id, null, data)
                    }
                })
                this.getChildDevices().findAll({ 
                    !(selectors.contains("${it.deviceNetworkId}"))
                }).each({ 
                    log.info("Deleting ${it.deviceNetworkId}")
                    this.deleteChildDevice(it.deviceNetworkId)
                })
                this.runIn(1, 'refreshDevices')
            

	})
