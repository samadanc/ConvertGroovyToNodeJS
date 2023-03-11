
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('handleDeviceEvent', (context, event) => {
        
                let msg = "POST / HTTP/1.1
        HOST: $ip:$port
        CONTENT-TYPE: text/plain
        DEVICE-NETWORK-ID: ${evt?.device?.deviceNetworkId}
        CONTENT-LENGTH: ${event.value.length()}
        
        ${event.value}
        "
                if (enabled) {
                    if (logEnable) {
                        console.log("Name: ${event.device.displayName}, DNI: ${event.device.deviceNetworkId}, value: ${event.value}")
                    }
                    this.sendHubCommand(new physicalgraph.device.HubAction(msg, physicalgraph.device.Protocol.LAN, "$ip:$port"))
                }
            

	})
