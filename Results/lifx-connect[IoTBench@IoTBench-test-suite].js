
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.runEvery5Minutes('updateDevices', delay);

    })

    .scheduledEventHandler('updateDevices', (context, event) => {
        
                if (!state.devices) {
                    state.devices = [:]
                }
                let devices = this.devicesInLocation()
                let selectors = []
                console.log("All selectors: $selectors")
                devices.each({ let device ->
                    let childDevice = this.getChildDevice(device.id)
                    selectors.add("${device.id}")
                    if (!childDevice) {
                        if (device.product.capabilities.has_color) {
                            childDevice = this.addChildDevice(app.namespace, 'LIFX Color Bulb', device.id, null, ['label': device.label, 'completedSetup': true])
                        } else {
                            childDevice = this.addChildDevice(app.namespace, 'LIFX White Bulb', device.id, null, ['label': device.label, 'completedSetup': true])
                        }
                    }
                    if (device.product.capabilities.has_color) {
                        childDevice.sendEvent(['name': 'color', 'value': colorUtil.hslToHex(((device.color.hue / 3.6) as int), ((device.color.saturation * 100) as int))])
                        childDevice.sendEvent(['name': 'hue', 'value': device.color.hue / 3.6])
                        childDevice.sendEvent(['name': 'saturation', 'value': device.color.saturation * 100])
                    }
                    childDevice.sendEvent(['name': 'label', 'value': device.label])
                    childDevice.sendEvent(['name': 'level', 'value': Math.round(device.brightness ? device.brightness : 1 * 100)])
                    childDevice.sendEvent(['name': 'switch.setLevel', 'value': Math.round(device.brightness ? device.brightness : 1 * 100)])
                    childDevice.sendEvent(['name': 'switch', 'value': device.power])
                    childDevice.sendEvent(['name': 'colorTemperature', 'value': device.color.kelvin])
                    childDevice.sendEvent(['name': 'model', 'value': device.product.name])
                    if (state.devices[device.id] == null) {
                        state.devices[device.id] = ['online': !device.connected]
                    }
                    if (!state.devices[device.id]?.online && device.connected) {
                        childDevice?.sendEvent(['name': 'DeviceWatch-DeviceStatus', 'value': 'online', 'displayed': false])
                        console.log("$device is back Online")
                    } else {
                        if (state.devices[device.id]?.online && !device.connected) {
                            childDevice?.sendEvent(['name': 'DeviceWatch-DeviceStatus', 'value': 'offline', 'displayed': false])
                            console.log("$device went Offline")
                        }
                    }
                    state.devices[device.id] = ['online': device.connected]
                })
                this.getChildDevices().findAll({ 
                    !(selectors.contains("${it.deviceNetworkId}"))
                }).each({ 
                    log.info("Deleting ${it.deviceNetworkId}")
                    if (state.devices[it.deviceNetworkId]) {
                        state.devices[it.deviceNetworkId] = null
                    }
                    try {
                        this.deleteChildDevice(it.deviceNetworkId)
                    } 
                    catch (Exception e) {
                        console.log('Can\'t remove this device because it\'s being used by an SmartApp')
                    } 
                })
            

	})
