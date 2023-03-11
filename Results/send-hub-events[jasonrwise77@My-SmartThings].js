
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('handleDeviceEvent', (context, event) => {
        
                let dni = "stHub_${evt?.device?.deviceNetworkId}"
                let msg = "POST / HTTP/1.1
        HOST: $ip:39501
        CONTENT-TYPE: text/plain
        DEVICE-NETWORK-ID: $dni
        CONTENT-LENGTH: ${event.value.length()}
        
        ${event.value}
        "
                if (enabled) {
                    if (logEnable) {
                        console.log("Name: ${event.device.displayName}, DNI: $dni, value: ${event.value}")
                    }
                    this.sendHubCommand(new physicalgraph.device.HubAction(msg, physicalgraph.device.Protocol.LAN, "$ip:39501"))
                }
            

	})

    .subscribedEventHandler('omniDeviceEvent', (context, event) => {
        
                let dni = "stHub_${evt?.device?.deviceNetworkId}"
                let msg = "POST / HTTP/1.1
        HOST: $ip:39501
        CONTENT-TYPE: text/plain
        DEVICE-NETWORK-ID: $dni
        CONTENT-LENGTH: ${((event.name.length() + event.value.length()) + 1)}
        
        ${event.name}:${event.value}
        "
                if (enabled) {
                    if (logEnable) {
                        console.log("Name: ${event.device.displayName}, DNI: $dni, name: ${event.name} value: ${event.value}")
                    }
                    this.sendHubCommand(new physicalgraph.device.HubAction(msg, physicalgraph.device.Protocol.LAN, "$ip:39501"))
                }
            

	})
