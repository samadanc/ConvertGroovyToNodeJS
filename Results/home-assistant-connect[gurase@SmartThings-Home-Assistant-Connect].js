
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
        
                this.getEntities()
                let devices = this.getChildDevices()
                devices.findAll({ 
                    it.getTypeName() == 'Home Assistant Cover'
                }).each({ let device ->
                    let entityId = device.getDeviceNetworkId()
                    let entity = state.entities.covers[ entityId ]
                    device.sendEvent(['name': 'windowShade', 'value': entity.state])
                    device.sendEvent(['name': 'level', 'value': entity.attributes.current_position])
                    device.sendEvent(['name': 'label', 'value': entity.attributes.smartthings_name ? entity.attributes.smartthings_name : entity.attributes.friendly_name])
                })
                devices.findAll({ 
                    it.getTypeName() == 'Home Assistant Light'
                }).each({ let device ->
                    let entityId = device.getDeviceNetworkId()
                    let entity = state.entities.lights[ entityId ]
                    if (entity.attributes.rgb_color) {
                        device.sendEvent(['name': 'color', 'value': colorUtil.rgbToHex(entity.attributes.rgb_color[0], entity.attributes.rgb_color[1], entity.attributes.rgb_color[2])])
                    }
                    if (entity.attributes.color_temp) {
                        device.sendEvent(['name': 'colorTemperature', 'value': 1000000.intdiv(entity.attributes.color_temp)])
                    }
                    if (entity.attributes.brightness) {
                        device.sendEvent(['name': 'level', 'value': entity.attributes.brightness / 255 * 100])
                        device.sendEvent(['name': 'switch.setLevel', 'value': entity.attributes.brightness / 255 * 100])
                    }
                    device.sendEvent(['name': 'switch', 'value': entity.state])
                    device.sendEvent(['name': 'label', 'value': entity.attributes.smartthings_name ? entity.attributes.smartthings_name : entity.attributes.friendly_name])
                })
                devices.findAll({ 
                    it.getTypeName() == 'Home Assistant Switch'
                }).each({ let device ->
                    let entityId = device.getDeviceNetworkId()
                    let entity = state.entities.subMap(['scripts', 'switches']).collectEntries({ 
                        it.value
                    })[ entityId ]
                    device.sendEvent(['name': 'switch', 'value': entity.state])
                    device.sendEvent(['name': 'label', 'value': entity.attributes.smartthings_name ? entity.attributes.smartthings_name : entity.attributes.friendly_name])
                })
            

	})
