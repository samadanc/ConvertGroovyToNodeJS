
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
        
                console.log('In Poll')
                this.getDeviceList()
                let children = this.getChildDevices()
                if (settings.devices) {
                    settings.devices.each({ let device ->
                        console.log("Devices Inspected ${device.inspect()}")
                        let item = device.tokenize('|')
                        let deviceType = item[0]
                        let deviceId = item[1]
                        let deviceName = item[2]
                        let existingDevices = children.find({ let d ->
                            d.deviceNetworkId.contains(deviceId + '|' + deviceType )
                        })
                        if (existingDevices) {
                            existingDevices.poll()
                        }
                    })
                }
            

	})
