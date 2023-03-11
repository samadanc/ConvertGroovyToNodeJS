
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section(''Title'', section => {

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.runIn('removeKid', delay);

    })

    .subscribedEventHandler('processSwitches', (context, event) => {
        
                let sceneID = event.device.name
                console.log("Simple Manual Scene: Switch pressed!  $sceneID")
                let numDevices = this.getMaxDeviceIDX(sceneID)
                if (!numDevices) {
                    return null
                }
                let deviceID 
                let deviceOptions 
                (1.. numDevices ).each({ 
                    deviceID = "$sceneIDd$it"
                    if (settings[ deviceID ] && settings["$deviceIDStatus"] == 'active') {
                        settings[ deviceID ].each({ let dev ->
                            if (dev) {
                                console.log("Processing device ${dev.name}")
                                deviceOptions = [:]
                                if (settings["$deviceIDState"] == 'off') {
                                    dev.off()
                                } else {
                                    dev.on()
                                    if (settings["$deviceIDLevel"]) {
                                        dev.setLevel(this.rangeFix(settings["$deviceIDLevel"]))
                                    }
                                    if (settings["$deviceIDHue"]) {
                                        deviceOptions.put('hue', this.rangeFix(settings["$deviceIDHue"]))
                                    }
                                    if (settings["$deviceIDSaturation"]) {
                                        deviceOptions.put('saturation', this.rangeFix(settings["$deviceIDSaturation"]))
                                    }
                                    if (deviceOptions) {
                                        dev.setColor(deviceOptions)
                                    }
                                }
                            }
                        })
                    }
                })
            

	})

    .scheduledEventHandler('removeKid', (context, event) => {
        
                console.log("Remove list: ${atomicState.removeList}")
                atomicState.removeList.each({ 
                    try {
                        this.deleteChildDevice(it)
                    } 
                    catch (let any) {
                        log.error(any)
                    } 
                })
                atomicState.removeList = []
                console.log("Remove list post: ${atomicState.removeList}")
            

	})
