
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('buttonEvent', (context, event) => {
        
                if (allOk) {
                    if (state.debug) {
                        console.log(evt)
                    }
                    if (state.debug) {
                        console.log(event.data)
                    }
                    String[] extra = event.data.split(',')
                    String extrapayload = extra[0]
                    String[] sections = extrapayload.split(':')
                    String payload = sections[1]
                    if (state.debug) {
                        console.log("Command: $payload")
                    }
                    String payload2 = payload.replaceAll('[/}/g]', '')
                    Integer payload3 = payload2.toInteger()
                    let buttonNumber = payload3 
                    if (buttonNumber != state.buttonnumber) {
                        if (state.debug) {
                            console.log('Not for me')
                        }
                        return null
                    }
                    let value = event.value
                    if (state.debug) {
                        console.log("button: $buttonNumber, value: $value")
                    }
                    if (DeviceHeldDimUp != null) {
                        if (DeviceHeldDimUp[0].currentSwitch == 'off') {
                            atomicState.deviceHeldDimUpLevel = 0
                        } else {
                            atomicState.deviceHeldDimUpLevel = DeviceHeldDimUp[0].currentLevel
                        }
                    }
                    if (DeviceHeldDimDown != null) {
                        if (DeviceHeldDimDown[0].currentSwitch == 'off') {
                            atomicState.deviceHeldDimDownLevel = 0
                        } else {
                            atomicState.deviceHeldDimDownLevel = DeviceHeldDimDown[0].currentLevel
                        }
                    }
                    this.executeHandlers(buttonNumber, value)
                

	})
