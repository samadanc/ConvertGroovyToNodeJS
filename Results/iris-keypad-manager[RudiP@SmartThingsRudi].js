
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

    .subscribedEventHandler('panicHandler', (context, event) => {
        
                console.log("Received Panic button state: ${event.value.value}")
                let switchState = (event.value as String)
                if (switchState == 'on') {
                    if (settings.panicRoutine) {
                        location.helloHome?.execute(settings.panicRoutine)
                    }
                }
            

	})

    .subscribedEventHandler('codeEntryHandler', (context, event) => {
        
                console.log('Received code entry event from Keypad!')
                let codeEntered = (event.value as String)
                let correctCode = this.getPIN()
                if (codeEntered == '----') {
                    codeEntered = correctCode 
                }
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
                    console.log('Invalid PIN')
                    keypad.sendInvalidKeycodeResponse()
                }
            

	})
