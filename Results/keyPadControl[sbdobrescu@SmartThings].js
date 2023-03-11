
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'alarmSystemStatus', 'alarmStatusHandler')

    })

    .subscribedEventHandler('alarmStatusHandler', (context, event) => {
        
                console.log('Keypad manager caught alarm status change: ' + event.value)
                if (event.value == 'off') {
                    keypad?.setDisarmed()
                } else {
                    if (event.value == 'away') {
                        keypad?.setArmedAway()
                    } else {
                        if (event.value == 'stay') {
                            keypad?.setArmedStay()
                        }
                    }
                }
            

	})

    .subscribedEventHandler('buttonNumHandler', (context, event) => {
        
                let event = event.data
                let eVal = event.value
                let eName = event.name
                let eDev = event.device
                if (parent) {
                    log.info("button event received: event = $event, eVal = $eVal, eName = $eName, eDev = $eDev, eDisplayN = $eDisplayN, eDisplayT = $eDisplayT, eTxt = $eTxt")
                }
                let buttonNumUsed = event.data.replaceAll('\D+', '')
                buttonNumUsed = buttonNumUsed.toInteger()
                java.lang.Integer butNum = buttonNumUsed 
                log.warn("button num = $butNum, value = $eVal")
                console.log('Panic button pushed. Toggle switches')
                if (pButton) {
                    if (pButton?.currentValue('switch').contains('on')) {
                        pButton?.off()
                    } else {
                        if (pButton?.currentValue('switch').contains('off')) {
                            pButton?.on()
                        }
                    }
                }
            

	})

    .subscribedEventHandler('codeEntryHandler', (context, event) => {
        
                console.log("Caught code entry event! ${event.value.value}")
                log.warn("keypad data ${event.value}")
                let codeEntered = (event.value as String)
                let correctCode = this.getPIN('security')
                let data = (event.data as String)
                let armMode = ''
                if (data == '0') {
                    armMode = 'off'
                } else {
                    if (data == '3') {
                        armMode = 'away'
                    } else {
                        if (data == '1') {
                            armMode = 'stay'
                        } else {
                            if (data == '2') {
                                armMode = 'stay'
                            } else {
                                log.error("${app.label}: Unexpected arm mode sent by keypad!: " + data )
                                return []
                            }
                        }
                    }
                }
                if (codeEntered == correctCode ) {
                    console.log("Correct PIN entered. Change SHM state to $armMode")
                    keypad.acknowledgeArmRequest(data)
                    this.sendSHMEvent(armMode)
                    this.execRoutine(armMode)
                } else {
                    console.log('Checking Control PIN')
                    correctCode = this.getPIN('control')
                    if (codeEntered == correctCode ) {
                        keypad.sendInvalidKeycodeResponse()
                        console.log('Correct control PIN entered. Toggle switches')
                        if (sSwitches) {
                            if (sSwitches?.currentValue('switch').contains('on')) {
                                sSwitches?.off()
                            } else {
                                if (sSwitches?.currentValue('switch').contains('off')) {
                                    sSwitches?.on()
                                }
                            }
                        }
                    } else {
                        if (codeEntered == '0000') {
                            keypad.sendInvalidKeycodeResponse()
                            console.log('On button code entered. Toggle switches')
                            if (onButton) {
                                if (onButton?.currentValue('switch').contains('on')) {
                                    onButton?.off()
                                } else {
                                    if (onButton?.currentValue('switch').contains('off')) {
                                        onButton?.on()
                                    }
                                }
                            }
                        } else {
                            console.log("No match. PIN entered was $codeEntered. Sending InvalidKeycodeResponse")
                            keypad.sendInvalidKeycodeResponse()
                        }
                    }
                }
            

	})
