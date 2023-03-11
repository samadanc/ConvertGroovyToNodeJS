
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('zoneSwitchHandler', (context, event) => {
        
                if (parent.settings.isDebug) {
                    console.log("Zone switch changed state! ${event.value}!")
                }
                let jsonObj = new JsonSlurper().parseText(event.data)
                if (jsonObj.sendReq == true) {
                    let deviceId = "${settings.macAddress}/0"
                    let myDevice = this.getChildDevice(deviceId)
                    if (myDevice) {
                        myDevice.unknown()
                    }
                    let path = parent.buildPath('rgbw/power', event.value, evt)
                    parent.httpCall(path, settings.macAddress, evt)
                }
            

	})

    .subscribedEventHandler('masterSwitchRefreshHandler', (context, event) => {
        
                if (parent.settings.isDebug) {
                    console.log('Master switch command : refresh !')
                }
                let path = parent.buildPath('rgbw', 'status', evt)
                parent.httpCall(path, settings.macAddress, evt)
            

	})

    .subscribedEventHandler('zoneSwitchColorHandler', (context, event) => {
        
                if (parent.settings.isDebug) {
                    console.log("Zone switch color change! ${event.value}!")
                }
                let jsonObj = new JsonSlurper().parseText(event.data)
                if (jsonObj.sendReq == true) {
                    let deviceId = "${settings.macAddress}/0"
                    let myDevice = this.getChildDevice(deviceId)
                    if (myDevice) {
                        myDevice.unknown()
                    }
                    let path = parent.buildPath('rgbw/color', event.value, evt)
                    parent.httpCall(path, settings.macAddress, evt)
                }
            

	})

    .subscribedEventHandler('masterSwitchColorHandler', (context, event) => {
        
                if (parent.settings.isDebug) {
                    console.log("master color set! ${settings.macAddress} / ${event.device.name} / ${event.value}")
                }
                let path = parent.buildPath('rgbw/color', event.value, evt)
                parent.httpCall(path, settings.macAddress, evt)
                this.getChildDevices().each({ 
                    if (it.getPreferences()['group'] != '0' && it.getPreferences()['group'] != null) {
                        it.setColor(event.value, false)
                    }
                })
            

	})

    .subscribedEventHandler('masterSwitchOffHandler', (context, event) => {
        
                if (parent.settings.isDebug) {
                    console.log("master switch off! ${settings.macAddress} / ${event.device.name}")
                }
                let path = parent.buildPath('rgbw/power', 'off', evt)
                parent.httpCall(path, settings.macAddress, evt)
                this.getChildDevices().each({ 
                    it.off(false)
                })
            

	})

    .subscribedEventHandler('zoneSwitchLevelHandler', (context, event) => {
        
                if (parent.settings.isDebug) {
                    console.log("Zone switch changed level! ${event.value}!")
                }
                let jsonObj = new JsonSlurper().parseText(event.data)
                if (jsonObj.sendReq == true) {
                    let deviceId = "${settings.macAddress}/0"
                    let myDevice = this.getChildDevice(deviceId)
                    if (myDevice) {
                        myDevice.unknown()
                    }
                    let path = parent.buildPath('rgbw/brightness', event.value.toInteger(), evt)
                    parent.httpCall(path, settings.macAddress, evt)
                }
            

	})

    .subscribedEventHandler('masterSwitchLevelHandler', (context, event) => {
        
                if (parent.settings.isDebug) {
                    console.log("master switch set level! ${settings.macAddress} / ${event.device.name} / ${event.value}")
                }
                let path = parent.buildPath('rgbw/brightness', event.value.toInteger(), evt)
                parent.httpCall(path, settings.macAddress, evt)
                this.getChildDevices().each({ 
                    it.setLevel(event.value.toInteger(), false)
                })
            

	})
