
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
                let devices = this.devicesInLocation()
                let deviceIds = devices*.id
                devices.each({ let device ->
                    let childDevice = this.getChildDevice(device.id)
                    if (!childDevice) {
                        log.info("Adding device ${device.id}: ${device.capabilities}")
                        let data = ['label': device.label, 'level': this.sprintf('%f', device.brightness ? device.brightness : 1 * 100), 'switch': device.connected ? device.power : 'unreachable', 'colorTemperature': device.color.kelvin]
                        if (device.capabilities.has_color) {
                            data['color'] = colorUtil.hslToHex(((device.color.hue / 3.6) as int), ((device.color.saturation * 100) as int))
                            data['hue'] = device.color.hue / 3.6
                            data['saturation'] = device.color.saturation * 100
                            childDevice = this.addChildDevice('smartthings', 'LIFX Color Bulb', device.id, null, data)
                        } else {
                            childDevice = this.addChildDevice('smartthings', 'LIFX White Bulb', device.id, null, data)
                        }
                    }
                })
                this.getChildDevices().findAll({ 
                    !(deviceIds.contains(it.deviceNetworkId))
                }).each({ 
                    log.info("Deleting ${it.deviceNetworkId}")
                    this.deleteChildDevice(it.deviceNetworkId)
                })
                this.runIn(1, 'refreshDevices')
            

	})
