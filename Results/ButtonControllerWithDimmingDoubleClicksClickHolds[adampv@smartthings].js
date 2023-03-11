
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
                    String[] extra = event.data.split(',')
                    String extrapayload = extra[0]
                    String[] sections = extrapayload.split(':')
                    String payload = sections[1]
                    String payload2 = payload.replaceAll('[/}/g]', '')
                    Integer payload3 = payload2.toInteger()
                    let buttonNumber = payload3 
                    let value = event.value
                    console.log("button: $buttonNumber, value: $value")
                    atomicState.startHoldTime = 0
                    atomicState.buttonIsHolding = false
                    atomicState.currentButton = -1
                    if (Device1heldDimUp != null) {
                        if (Device1heldDimUp[0].currentSwitch == 'off') {
                            atomicState.device1heldDimUpLevel = 0
                        } else {
                            atomicState.device1heldDimUpLevel = Device1heldDimUp[0].currentLevel
                        }
                    }
                    if (Device2heldDimUp != null) {
                        if (Device2heldDimUp[0].currentSwitch == 'off') {
                            atomicState.device2heldDimUpLevel = 0
                        } else {
                            atomicState.device2heldDimUpLevel = Device2heldDimUp[0].currentLevel
                        }
                    }
                    if (Device3heldDimUp != null) {
                        if (Device3heldDimUp[0].currentSwitch == 'off') {
                            atomicState.device3heldDimUpLevel = 0
                        } else {
                            atomicState.device3heldDimUpLevel = Device3heldDimUp[0].currentLevel
                        }
                    }
                    if (Device4heldDimUp != null) {
                        if (Device4heldDimUp[0].currentSwitch == 'off') {
                            atomicState.device4heldDimUpLevel = 0
                        } else {
                            atomicState.device4heldDimUpLevel = Device4heldDimUp[0].currentLevel
                        }
                    }
                    if (Device1heldDimDown != null) {
                        if (Device1heldDimDown[0].currentSwitch == 'off') {
                            atomicState.device1heldDimDownLevel = 0
                        } else {
                            atomicState.device1heldDimDownLevel = Device1heldDimDown[0].currentLevel
                        }
                    }
                    if (Device2heldDimDown != null) {
                        if (Device2heldDimDown[0].currentSwitch == 'off') {
                            atomicState.device2heldDimDownLevel = 0
                        } else {
                            atomicState.device2heldDimDownLevel = Device2heldDimDown[0].currentLevel
                        }
                    }
                    if (Device3heldDimDown != null) {
                        if (Device3heldDimDown[0].currentSwitch == 'off') {
                            atomicState.device3heldDimDownLevel = 0
                        } else {
                            atomicState.device3heldDimDownLevel = Device3heldDimDown[0].currentLevel
                        }
                    }
                    if (Device4heldDimDown != null) {
                        if (Device4heldDimDown[0].currentSwitch == 'off') {
                            atomicState.device4heldDimDownLevel = 0
                        } else {
                            atomicState.device4heldDimDownLevel = Device4heldDimDown[0].currentLevel
                        }
                    }
                    this.executeHandlers(buttonNumber, value)
                

	})
